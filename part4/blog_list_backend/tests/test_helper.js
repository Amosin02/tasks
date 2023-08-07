const Blog = require('../models/note')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'title of somekind',
    author: 'Justin jefferson',
    url: 'http://justSomeURL1',
    likes: 23
  },
  {
    title: 'title of otherkind',
    author: 'Kira Eris',
    url: 'http://justSomeURL2',
    likes: 42
  },
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(x => x.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(x => x.toJSON())
}

module.exports = {
  blogsInDB,
  initialBlogs,
  usersInDb
}