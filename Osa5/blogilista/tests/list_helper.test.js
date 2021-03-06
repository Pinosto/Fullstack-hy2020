/* eslint-disable camelcase */
const listHelper = require('../utils/list_helper');

const blogs_empty = [];
const blogs_one = [{
  _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0,
}];
const blogs_six = [{
  _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0,
}, {
  _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0,
}, {
  _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0,
}, {
  _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0,
}, {
  _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0,
}, {
  _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0,
},
];

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs_empty);
  expect(result).toBe(1);
});

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes(blogs_empty)).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(blogs_one)).toBe(7);
  });

  test('of bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs_six)).toBe(36);
  });
});

describe('favoriteBlog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog(blogs_empty)).toBe(null);
  });

  test('when list has only one blog equals the favorite blog to that', () => {
    expect(listHelper.favoriteBlog(blogs_one)).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    });
  });

  test('of bigger list is find right', () => {
    expect(listHelper.favoriteBlog(blogs_six)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

describe('mostBlog', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostBlogs(blogs_empty)).toBe(null);
  });

  test('when list has only one blog equals the most blog to that', () => {
    expect(listHelper.mostBlogs(blogs_one)).toEqual({
      author: 'Michael Chan',
      blogs: 1,
    });
  });

  test('of bigger list is find right', () => {
    expect(listHelper.mostBlogs(blogs_six)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('mostLikes', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostLikes(blogs_empty)).toBe(null);
  });

  test('when list has only one blog equals the most blog to that', () => {
    expect(listHelper.mostLikes(blogs_one)).toEqual({
      author: 'Michael Chan',
      likes: 7,
    });
  });

  test('of bigger list is find right', () => {
    expect(listHelper.mostLikes(blogs_six)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
