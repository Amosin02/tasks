const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const total = blogs.map(x => x.likes).reduce(function(sum, order) {
    return sum + order
  })
  
  return total
}

const favoriteBlog = (blogs) => {
  const filtered = blogs.map(x => x.likes)
  const highest = Math.max(...filtered)

  const out = blogs.filter(x => x.likes === highest)

  const can1 = {
    'author': out[0].author,
    'likes': out[0].likes,
    'title': out[0].title
  }

  return can1
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
}