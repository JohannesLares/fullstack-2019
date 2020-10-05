import blogService from '../services/blogs'

const likeComparator = (a, b) => {
    if(a.likes > b.likes) return -1
    if(b.likes > a.likes) return 1
    return 0
  }

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            action.blogs.sort(likeComparator)
            return action.blogs
        case 'CREATE_BLOG':
            return [...state, action.blog]
        case 'LIKE_BLOG':
            const blogToUpdate = state.find(b => b.id === action.blog.id)
            const updated = {
                ...blogToUpdate,
                likes: action.blog.likes
            }
            let blogs = state.map(blog => 
                blog.id !== action.blog.id ? blog : updated
            )
            console.log(blogs)
            return blogs.sort(likeComparator)
        case 'REMOVE_BLOG':
            return state.filter(blog => {
                if(blog.id !== action.id) return blog
            })
        case 'COMMENT':
            const blg = state.find(b => b.id === action.data.blog)
            console.log(action)
            const upd = {
                ...blg,
                comments: blg.comments.concat([action.data])
            }
            let blgs = state.map(blog => 
                blog.id !== action.data.blog ? blog : upd
            )
            console.log(blgs)
            return blgs.sort(likeComparator)
        default:
            return state
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const created = await blogService.createNew(blog)
        console.log(created)
        dispatch({
            type: 'CREATE_BLOG',
            blog: created.result
        })
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            blogs: blogs
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(blog)
        dispatch({
            type: 'LIKE_BLOG',
            blog: updatedBlog.data
        })
    }
}

export const removeBlog = id => {
    return async dispatch => {
        const removed = await blogService.deleteBlog(id)
        dispatch({
            type: 'REMOVE_BLOG',
            id
        })
    }
}

export const commentBlog = (comm,id) => {
    return async dispatch => {
        const newComment = await blogService.comment(comm,id)
        console.log(newComment)
        dispatch({
            type: 'COMMENT',
            data: newComment.data.comm
        })
    }
}

export default blogReducer