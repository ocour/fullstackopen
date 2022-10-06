const listHelper = require('../utils/list_helpers');

test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe('total likes', () => {
    const listWithMultipleBlogs = [
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
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422b891b54a676234d17fa',
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422ba71b54a676234d17fb',
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 0,
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

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([]);
        expect(result).toBe(0);
    });

    test('when list has only one blog, equals the likes of that', () => {
        const listWithOneBlog = [listWithMultipleBlogs[0]];

        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(7);
    });

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs);
        expect(result).toBe(36);
    });
});

describe('blog with most likes', () => {
    const listWithMultipleBlogs = [
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
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422b891b54a676234d17fa',
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422ba71b54a676234d17fb',
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 0,
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

    test('of empty list is undefined', () => {
        const result = listHelper.favoriteBlog([]);

        expect(result).toEqual(undefined);
    });

    test('when list has only on blog, equals to that list', () => {
        const listWithOneBlog = [listWithMultipleBlogs[0]];

        const result = listHelper.favoriteBlog(listWithOneBlog);
        expect(result).toEqual(listWithOneBlog[0]);
    });

    test('to be the list with most likes', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs);

        expect(result).toEqual(listWithMultipleBlogs[2]);
    });
});

describe('author who has most blogs', () => {
    const listWithMultipleBlogs = [
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
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422b891b54a676234d17fa',
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422ba71b54a676234d17fb',
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 0,
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

    test('of empty list returns empty object {}', () => {
        const result = listHelper.mostBlogs([]);

        // console.log(result);

        expect(result).toEqual({});
    });

    test('to be the author with most blogs', () => {
        const listWithOneBlog = [listWithMultipleBlogs[0]];

        const result = listHelper.mostBlogs(listWithOneBlog);

        // console.log(result);

        expect(result).toEqual({author: 'Michael Chan', blogs: 1});
    });

    test('to be the last author to full fill requirements', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs);

        // console.log(result);

        expect(result).toEqual({author: 'Robert C. Martin', blogs: 3});
    });
});

describe('author who has most likes', () => {
    const listWithMultipleBlogs = [
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
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422b891b54a676234d17fa',
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422ba71b54a676234d17fb',
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 0,
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

    test('of empty list returns empty object {}', () => {
        const result = listHelper.mostLikes([]);

        // console.log(result);

        expect(result).toEqual({});
    });

    test('to be the author with most likes and their likes', () => {
        const listWithOneBlog = [listWithMultipleBlogs[0]];

        const result = listHelper.mostLikes(listWithOneBlog);

        // console.log(result);

        expect(result).toEqual({author: 'Michael Chan', likes: 7});
    });

    test('to be the last author to full fill requirements', () => {
        const result = listHelper.mostLikes(listWithMultipleBlogs);

        // console.log(result);

        expect(result).toEqual({author: 'Edsger W. Dijkstra', likes: 17});
    });
});

