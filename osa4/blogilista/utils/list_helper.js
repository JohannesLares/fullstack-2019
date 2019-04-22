const dummy = (blogs) => {
    return 1;
}

const totalLikes = blogs => {
    let total = 0;
    blogs.forEach(blog => total += blog.likes)
    return total;
}

const favoriteBlog = blogs => {
    let best = {};
    let max = 0;
    blogs.forEach(blog => {
        if(blog.likes > max) {
            best = blog; 
            max = blog.likes;
        }
    })

    return best;
}

const mostBlogs = blogs => {
    let writers = []
    let best = {}
    let max = 0;
    blogs.forEach(blog => {
        let found = false;
        writers.forEach(writer => {
            if(writer.author === blog.author){
                writer.blogs += 1
                found = true;
            }
        })
        if(!found){
            writers.push({author: blog.author, blogs: 1})
        }
    })
    writers.forEach(writer => {
        if(writer.blogs > max){
            max = writer.blogs;
            best = writer
        }
    })
    return best;
}

const mostLikes = blogs => {
    let writers = []
    let best = {}
    let max = 0;
    blogs.forEach(blog => {
        let found = false;
        writers.forEach(writer => {
            if(writer.author === blog.author){
                writer.likes += blog.likes
                found = true;
            }
        })
        if(!found){
            writers.push({author: blog.author, likes: blog.likes})
        }
    })
    writers.forEach(writer => {
        if(writer.likes > max){
            max = writer.likes;
            best = writer
        }
    })
    return best;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}