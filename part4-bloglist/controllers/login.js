const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response, next) => {
    try {
        const { username, password } = request.body;

        // find user, if does not exist set passwordCorrect to null
        // if exists check if passwords match and set passwordCorrect accordingly
        const user = await User.findOne({ username });
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);

        if(!(user && passwordCorrect))
        {
            return response.status(401).json({ error: 'invalid username or password' });
        }

        const userForToken = {
            username: user.username,
            id: user._id,
        };

        // expires in 1 hour
        // eslint-disable-next-line no-undef
        const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 });

        response.status(200).json({ token, username: user.username, name: user.name });
    }
    catch (error) {
        next(error);
    }
});

module.exports = loginRouter;