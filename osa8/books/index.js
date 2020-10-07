const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid')
const JWT = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const pubsub = new PubSub()

const mongoose = require('mongoose')

const secret ="SuperSecret"

const MONGODB_URI = 'mongodb+srv://dev:RCfZN4gMPWAy0TK0@puhelinluettelo.kdref.mongodb.net/graphQl?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }

    type Token {
      value: String!
    }

    type Book {
        title: String!
        author: Author!
        published: Int!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        bookCount: Int
        born: Int
        id: String
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
          username: String!
          favoriteGenre: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
    }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
      bookCount: async () => {
        const books = await Book.find({})
        return books.length
      },
      authorCount: async () => {
       const authors = await Author.find({})
       return authors.length
      },
      allBooks: async (root, args) => {
          const books = await Book.find({}).populate('author')
          if (!args.author && !args.genre)
              return books
          if(!args.genre && args.author)
              return books.filter(book => { return book.author.name === args.author })
          if(!args.author && args.genre)
              return books.filter(book => { return book.genres.includes(args.genre) })
          return books.filter(book => { return book.genres.includes(args.genre) && book.author.name === args.author })
        },
      allAuthors:() => Author.find({}),
      me: async (root, args, context) => {
        console.log(context)
        return context.user
      }
  },
  Author: {
      bookCount: async (root) => {
        const books = await Book.find({author: root._id})
        return books.length
      }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("not authenticated")
        }
        const author = await Author.findOne({name: args.author})
        var aId
        if(!author || author.length > 0) {
          const newAuthor = new Author({name: args.author})
          const savedAuthor = await newAuthor.save()
          aId = savedAuthor._id
        } else {
          aId = author._id
        }
        const book = new Book({...args, author: aId})
        const saved = await book.save();
        const bk = await Book.findOne({_id: saved._id}).populate('author')
        pubsub.publish('BOOK_ADDED', { bookAdded: bk })
        return bk
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("not authenticated")
        }
        const author = await Author.findOne({name: args.name})
        if (!author) return null
        const updated = await Author.findOneAndUpdate({_id: author._id}, {born: args.setBornTo})
        return Author.findOne({_id: author._id})
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      try {
        const newUser = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        return newUser.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if (args.password !== "123456") return null
      if (!user) return null
      return {value: JWT.sign({username: args.username, id: user._id}, secret)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = JWT.verify(
        auth.substring(7), secret
      )
      const user = await User
        .findById(token.id)
        console.log(token)
      return { user }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})

