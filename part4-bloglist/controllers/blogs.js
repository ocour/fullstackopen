const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({});
        response.json(blogs);
    }
    catch(exception) {
        next(exception);
    }
});

blogRouter.post('/', async (request, response, next) => {
    const body = request.body;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    });
    
    try {
        const result = await blog.save();
        response.status(201).json(result);
    }
    catch(exception) {
        next(exception);
    }
});

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
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