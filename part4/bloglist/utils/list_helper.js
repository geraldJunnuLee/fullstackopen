const dummy = (blogs) => {
  const receivedBlogs = blogs
  console.log(receivedBlogs)
  return 1
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((acc, curr) => acc + curr.likes, 0)
  return totalLikes
}

const blogWithMostLikes = (blogs) => {
  const totalLikes = blogs.reduce((acc, curr) => {
    if (acc.likes > curr.likes) {
      return acc
    } else {
      return curr
    }
  }, blogs[0])
  return totalLikes
}

const mostBlogs = (blogs) => {
  const calculateBlogs = blogs.reduce((acc, curr) => {
    acc[curr.author] = (acc[curr.author] || 0) + 1
    return acc
  }, {})

  let author
  let maxBlogs = 0

  for (const [currentAuthor, blogsAmount] of Object.entries(calculateBlogs)) {
    if (blogsAmount > maxBlogs) {
      author = currentAuthor
      maxBlogs = blogsAmount
    }
  }

  const authorWithMostBlogs = {
    author,
    blogs: maxBlogs,
  }

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  const calculateLikes = blogs.reduce((acc, curr) => {
    acc[curr.author] = (acc[curr.author] || 0) + curr.likes
    return acc
  }, {})

  let author
  let mostLikes = 0

  for (const [currentAuthor, likesAmount] of Object.entries(calculateLikes)) {
    if (likesAmount > mostLikes) {
      author = currentAuthor
      mostLikes = likesAmount
    }
  }

  const authorWithMostLikes = {
    author,
    likes: mostLikes,
  }

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  blogWithMostLikes,
  mostBlogs,
  mostLikes,
}
