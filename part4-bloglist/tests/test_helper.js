// const Blog = require('../models/blog');

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }  
];

const initialUsers = [
    {
        username: 'root10',
        name: 'Superuser10',
        password: 'password',
    },
    {
        username: 'root11',
        name: 'Superuser11',
        password: 'password',
    },
    {
        username: 'root12',
        name: 'Superuser12',
        password: 'password',
    },
];

module.exports = {
    initialBlogs,
    initialUsers
};