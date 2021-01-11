const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('testing get method ', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(6);
  });

  test('the fourth blog is about First class tests', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[3].title).toBe('First class tests');
  });

  test('id format is id not _id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

describe('testing post method ', () => {
  let token = null;
  beforeEach(async () => {
    await User.deleteMany({});
    const password = 'testisalasana';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username: 'testiteppo',
      name: 'Testi Teppo',
      passwordHash,
    });
    await user.save();

    await api
      .post('/api/login')
      .send({
        username: 'testiteppo',
        password: 'testisalasana',
      })
      .then((response) => {
        token = response.body.token;
      });
    return token;
  });
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Jahu Pino',
      url: 'http://blog.cleancoder.com/jahu-bob/2017/03/03/async.html',
      likes: 99,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain(
      'async/await simplifies making async calls',
    );
  });

  test('default likes is zero ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Jahu Pino',
      url: 'http://blog.cleancoder.com/jahu-bob/2017/03/03/async.html',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body[6].likes).toBe(0);
  });

  test('url required, status code 400 ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Jahu Pino',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('title required, status code 400 ', async () => {
    const newBlog = {
      author: 'Jahu Pino',
      url: 'http://blog.cleancoder.com/jahu-bob/2017/03/03/async.html',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe('testing for single id ', () => {
  test('get one blog by id ', async () => {
    const response = await api.get('/api/blogs/5a422a851b54a676234d17f7');
    expect(response.body.title).toContain('React patterns');
  });

  test('update one blog by id ', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 33 })
      .expect(200);

    expect(response.body.likes).toEqual(33);
  });
});

describe('testing delete ', () => {
  let token = null;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    const password = 'testisalasana';
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username: 'testiteppo',
      name: 'Testi Teppo',
      passwordHash,
    });
    await user.save();

    await api
      .post('/api/login')
      .send({
        username: 'testiteppo',
        password: 'testisalasana',
      })
      .then((response) => {
        token = response.body.token;
      });

    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Jahu Pino',
      url: 'http://blog.cleancoder.com/jahu-bob/2017/03/03/async.html',
      likes: 99,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200);

    const newBlog2 = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 9,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog2)
      .expect(200);
    return token;
  });

  test('delete one blog by id ', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1,
    );

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
  test('unauthorized fail to delete ', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    const falseToken = 'falsetoken';

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${falseToken}`)
      .expect(401);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length,
    );

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
