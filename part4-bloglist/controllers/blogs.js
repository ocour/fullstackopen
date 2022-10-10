/* eslint-disable no-undef */
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog
            .find({})
            .populate('user', { username: 1, name: 1 });
        response.json(blogs);
    }
    catch(exception) {
        next(exception);
    }
});

blogRouter.post('/', async (request, response, next) => {    
    try {
        const body = request.body;
        const token = request.headers.authorization;

        const decodeToken = jwt.verify(token, process.env.SECRET);
        if(!decodeToken.id)
        {
            return response.status(401).json({ error: 'token missing or invalid' });
        }

        const user = await User.findById(decodeToken.id);
    
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        });

        // save blog
        const savedBlog = await blog.save();

        // save blogs id to user
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.status(201).json(savedBlog);
    }
    catch(exception) {
        next(exception);
    }
});

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        // get token from header
        const token = request.headers.authorization;

        // decode token to get users id
        const decodeToken = jwt.verify(token, process.env.SECRET);
        if(!decodeToken.id)
        {
            return response.status(401).json({ error: 'token missing or invalid' });
        }

        // finds blog by id given in get request
        const blog = await Blog.findById(request.params.id);
        if(!blog)
        {
            return response.status(400).json({ error: 'blog with id does not exist' });
        }

        // compares tokens user id and blogs user id
        if(blog.user.toString() === decodeToken.id.toString())
        {
            await Blog.findByIdAndRemove(blog._id);
            return response.status(204).end();
        }
        else
        {
            return response.status(400).json({ error: 'cannot delete blogs that have not been made by you' });
        }
    }
    catch(exception){
        next(exception);
    }
});

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    };

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            blog,
            { new: true, runValidators: true, context: 'query' }
        );
        response.json(updatedBlog);
    }
    catch(exception) {
        next(exception);
    }
});

module.exports = blogRouter;