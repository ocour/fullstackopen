const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (request, response, next) => {
    try {
        const users = await User
            .find({})
            .populate('blogs', { url: 1, title: 1, author: 1 });
        response.json(users);
    }
    catch(error) {
        next(error);
    }
});

userRouter.post('/', async (request, response, next) => {
    try {
        const { username, name, password } = request.body;

        // both username and password need to be given
        if(!username || !password)
        {
            return response.status(400).json({ error: 'username or password missing' });
        }

        // both username and password need to be atleast 3 characters long
        if(username.length < 3 || password.length < 3)
        {
            return response.status(400).json(
                { error: 'username and password need to be atleast 3 characters long' }
            );
        }

        // username must be unique
        const existingUser = await User.findOne({ username });
        if(existingUser)
        {
            return response.status(400).json({ error: 'username must be unique' });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        console.log(passwordHash);

        const user = new User({
            username,
            passwordHash,
            name,
        });

        const savedUser = await user.save();
        response.status(201).json(savedUser);
        
    }
    catch (exception) {
        next(exception);
    }
});

module.exports = userRouter;