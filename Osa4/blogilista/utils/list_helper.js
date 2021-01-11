/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  const one = 1;
  return one;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs) {
    return null;
  }
  if (blogs.length === 0) {
    return null;
  }

  const blogWithMostLikes = blogs.reduce((mostLikesBlog, blog) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    (mostLikesBlog.likes > blog.likes ? mostLikesBlog : blog));

  delete blogWithMostLikes._id;
  delete blogWithMostLikes.url;
  delete blogWithMostLikes.__v;
  return blogWithMostLikes;
};

const mostBlogs = (blogs) => {
  if (!blogs) {
    return null;
  }
  if (blogs.length === 0) {
    return null;
  }

  const blogCount = new Map();

  blogs.forEach((blog) => {
    if (!blogCount.has(blog.author)) {
      blogCount.set(blog.author, 0);
    }
    blogCount.set(blog.author, (blogCount.get(blog.author) + 1));
  });
  let author;
  let blogsCount = 0;
  blogCount.forEach((value, key) => {
    if (blogsCount < value) {
      author = key;
      blogsCount = value;
    }
  });

  return { author, blogs: blogsCount };
};

const mostLikes = (blogs) => {
  if (!blogs) {
    return null;
  }
  if (blogs.length === 0) {
    return null;
  }

  const blogCount = new Map();

  blogs.forEach((blog) => {
    if (!blogCount.has(blog.author)) {
      blogCount.set(blog.author, 0);
    }
    blogCount.set(blog.author, (blogCount.get(blog.author) + blog.likes));
  });
  let author;
  let likeCount = 0;
  blogCount.forEach((value, key) => {
    if (likeCount < value) {
      author = key;
      likeCount = value;
    }
  });

  return { author, likes: likeCount };
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};
