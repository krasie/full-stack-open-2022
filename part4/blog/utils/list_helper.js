var _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    const likes = blogs.map(
        blog => blog.likes
    )

    const sumLikes = Number(likes.reduce(reducer,0))

    return sumLikes ? sumLikes : 0
}

const favoriteBlog = (blogs) =>{
    const maxLikes = blogs.reduce((p,v) => p.likes < v.likes ? v : p)
    return maxLikes
}

const mostBlogs = (blogs) =>{
    let res = []
    const groupByAuthor = _.groupBy(blogs,'author')
    _.forEach(groupByAuthor,(v,k)=>{
        const stats = {}
        res = res.concat({'author' : k,'blogs':Number(_.values(_.countBy(v,'length')))})
    })
    const stats = res.reduce((p,v) => p.blogs < v.blogs ? v : p)
    return stats
}

module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs
}