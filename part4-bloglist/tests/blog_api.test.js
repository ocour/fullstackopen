const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

// ran before every test
beforeEach(async () => {
    // delete existing blogs and users
    await Blog.deleteMany({});
    await User.deleteMany({});

    // adds all users to database
    for(let user of helper.initialUsers)
    {
        const saltRounds = 10;
        let passwordHash = await bcrypt.hash(user.password, saltRounds);

        let userObj = new User({
            username: user.username,
            name: user.name,
            passwordHash: passwordHash
        });

        await userObj.save();
    }

    // adds all blog to database
    for(let[index, blog] of helper.initialBlogs.entries())
    {
        let user = helper.initialUsers[index];
        let userOfDb = await User.findOne({ username: user.username });

        let blogObj = new Blog({
            _id: blog._id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes,
            user: userOfDb._id
        });

        const savedBlog = await blogObj.save();

        userOfDb.blogs = userOfDb.blogs.concat(savedBlog._id);
        await userOfDb.save();
    }
});

test('blogs are returned as json and blogs length is correct', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('tests that get returns id rather than _id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
});

test('test that a valid blog can be added to the database', async () => {
    const newBlog = {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    };

    // assuming password is correct and username is unique
    let { username } = helper.initialUsers[0];

    // gets id of user by username
    const user = await User.findOne({ username });

    const userForToken = {
        username: username,
        id: user._id,
    };

    // eslint-disable-next-line no-undef
    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60});

    await api.post('/api/blogs')
        .send(newBlog)
        .set({'authorization': `bearer ${token}`})
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogsAfterSave = await api.get('/api/blogs');
    expect(blogsAfterSave.body).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAfterSave.body.map(b => b.title);
    expect(contents).toContain(newBlog.title);
});

test('test that verifies that if likes property of new blog is missing it will default to 0', async () => {
    const newBlog = {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        __v: 0
    };

    // assuming password is correct and username is unique
    let { username } = helper.initialUsers[0];

    const user = await User.findOne({ username });

    const userForToken = {
        username: username,
        id: user._id,
    };

    // eslint-disable-next-line no-undef
    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60});

    await api.post('/api/blogs')
        .send(newBlog)
        .set({'authorization': `bearer ${token}`})
        .expect(201)
        .expect('Content-Type', /application\/json/);

    // gets blogs after save from database, checks that their length includes newblog
    const blogsAfterSave = await api.get('/api/blogs');
    expect(blogsAfterSave.body).toHaveLength(helper.initialBlogs.length + 1);

    // checks that new blog has likes property
    expect(blogsAfterSave.body[helper.initialBlogs.length].likes).toBeDefined();

    // checks that likes of newBlog after save is indeed 0
    expect(blogsAfterSave.body[helper.initialBlogs.length].likes).toBe(0);
});

test('test that a invalid blog with title missing gives an 400 status code', async () => {
    const newBlog = {
        _id: '5a422ba71b54a676234d17fb',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    };

    // assuming password is correct and username is unique
    let { username } = helper.initialUsers[0];

    const user = await User.findOne({ username });

    const userForToken = {
        username: username,
        id: user._id,
    };

    // eslint-disable-next-line no-undef
    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60});

    await api.post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(400);
});

test('test that a invalid blog with url missing gives an 400 status code', async () => {
    const newBlog = {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        likes: 0,
        __v: 0
    };

    // assuming password is correct and username is unique
    let { username } = helper.initialUsers[0];

    const user = await User.findOne({ username });

    const userForToken = {
        username: username,
        id: user._id,
    };

    // eslint-disable-next-line no-undef
    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60});

    await api.post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(400);
});

test('deleting blog succeeds with status code 204 if id is valid', async () => {
    // gets blogs from database
    const blogsAtStart = await api.get('/api/blogs');
    const blogToDelete = blogsAtStart.body[0];

    // assuming password is correct and username is unique
    let { username } = helper.initialUsers[0];

    const user = await User.findOne({ username });

    const userForToken = {
        username: username,
        id: user._id,
    };

    // eslint-disable-next-line no-undef
    const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60});

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204);

    // compares length
    const blogsAtEnd = await api.get('/api/blogs');
    expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length - 1);

    // checks/compares if blogs in database contains deleted blog
    const contents = blogsAtEnd.body.map(b => b.title);
    expect(contents).not.toContain(blogToDelete.title);
});

test('succeeds with status code of 200 if updating blog works', async () => {
    const newBlogToUpdate = {...helper.initialBlogs[0], likes: 17};

    const updatedBlog = await api
        .put(`/api/blogs/${newBlogToUpdate._id}`)
        .send(newBlogToUpdate)
        .expect(200);
    
    // compares ids, need to be the same
    expect(updatedBlog.body.id).toBe(helper.initialBlogs[0]._id);

    // compares likes, should not be same
    expect(updatedBlog.body.likes).not.toBe(helper.initialBlogs[0].likes);
});

afterAll(() => {
    mongoose.connection.close();
});