const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, url: 1, author: 1 });
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const user = await User
    .findById(id)
    .populate('blogs', { title: 1, url: 1, author: 1 });
  response.json(user.toJSON());
});

usersRouter.post('/', async (request, response) => {
  const { body } = request;

  if (!body.password || body.password === '') {
    response.status(400).json({ error: 'password missing' });
  }
  if (body.password && body.password.length < 3) {
    response.status(400).json({ error: 'password is shorter than the minimum allowed length (3)' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
