var _ = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const total = (sumOfLikes, currentBlog) => {
        return sumOfLikes + currentBlog.likes;
    };

    return blogs.reduce(total, 0);
};

const favoriteBlog = (blogs) => {
    const largestLike = Math.max(...blogs.map(blog => blog.likes));

    return blogs.find(blog => blog.likes === largestLike);

    // const max = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
};

const mostBlogs = (blogs) => {
    // look out retarted code ahead.

    // console.log('blogs', blogs);

    // gets all authors, even duplicates
    const authors = blogs.map(blog => blog.author);
    // console.log('authors', authors);

    // counts authors
    const count = _.countBy(authors);
    // console.log('count', count);

    // gets the largest value
    const mostAuthorsValue = Math.max(...Object.values(count));
    // console.log('mostAuthorsValue',mostAuthorsValue);

    const result = _.reduce(count, (a, value, key) => {
        if(value === mostAuthorsValue)
        {
            return ({ 'author': key,'blogs': value });
        }

        return a;
    }, {});

    // console.log(result);

    return result;
};

const mostLikes = (blogs) => {
    // gets author of item and its likes
    const count = _.map(blogs, (value) => {
        return ({ 'author': value.author, 'likes': value.likes });
    });

    console.log(count);
    
    const authorsSumLikes = _(count).groupBy('author')
        .map((objs, key) => ({
            'author': key,
            'likes': _.sumBy(objs, 'likes')
        }))
        .value();

    console.log(authorsSumLikes);

    // returns object with most likes
    const reduced = _.reduce(authorsSumLikes, (acc, value) => {
        return (value.likes > acc.likes || acc.likes === undefined) ? value : acc;
    }, {});

    return reduced;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};