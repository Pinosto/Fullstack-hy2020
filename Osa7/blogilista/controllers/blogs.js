const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { text: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post('/', async (request, response) => {
  const { body } = request;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const savedBlog = await blog
    .save();
  const responseBlog = await Blog
    .findById(savedBlog.id)
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { text: 1 });
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  response.json(responseBlog.toJSON());
});

blogRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = await Blog
    .findById(id)
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { text: 1 });
  response.json(blog.toJSON());
});

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' });
  }
  const { id } = request.params;
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(id);

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } else {
    response.status(401).json({ error: 'you are not authorized' });
  }
});

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { body } = request;
  const blog = {
    likes: body.likes,
  };
  const updatedBlog = await Blog
    .findByIdAndUpdate(id, blog, { new: true })
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { text: 1 });
  response.status(200).json(updatedBlog.toJSON());
});

blogRouter.put('/comment/:id', async (request, response) => {
  const { id } = request.params;
  const { body } = request;

  const comment = new Comment({ text: body.comment });
  const savedComment = await comment.save();

  const blog = await Blog.findById(id);
  blog.comments = blog.comments.concat(savedComment.id);

  const updatedBlog = await Blog
    .findByIdAndUpdate(id, blog, { new: true })
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { text: 1 });

  response.status(200).json(updatedBlog.toJSON());
});

module.exports = blogRouter;
