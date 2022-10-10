/* eslint-disable no-unused-vars */
const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

// get all notes
notesRouter.get("/", async (request, response) => {
    const notes = await Note
        .find({})
        .populate("user", { username: 1, name: 1 });
    response.json(notes);
});

// Gets and returns one note by its id
notesRouter.get("/:id", async (request, response, next) => {
    // finds by id
    try {
        const note = await Note.findById(request.params.id);

        if(note)
        {
            response.json(note);
        }
        // Null
        else
        {
            response.status(404).end();
        }
    }
    // if error
    catch(exception) {
        next(exception);
    }
});

// Post/add note(s)
notesRouter.post("/", async (request, response, next) => {
    try {
        const body = request.body;
        const token = getTokenFrom(request);

        // eslint-disable-next-line no-undef
        const decodeToken = jwt.verify(token, process.env.SECRET);
        // if token invalid or missing
        if(!decodeToken.id)
        {
            return response.status(401).json({ error: "token missing or invalid" });
        }

        const user = await User.findById(decodeToken.id);

        // Create note
        const note = new Note({
            content: body.content,
            important: body.important === undefined ? false : body.important,
            date: new Date(),
            user: user._id,
        });

        //add note and note id to users
        // saves note
        const savedNote = await note.save();

        // adds savedNotes id to users notes array and saves it
        user.notes = user.notes.concat(savedNote._id);
        await user.save();

        response.status(201).json(savedNote);
    }
    // if error
    catch(exception) {
        next(exception);
    }
});

// Deletes one note by its id
notesRouter.delete("/:id", async (request, response, next) => {
    try {
        await Note.findByIdAndRemove(request.params.id);
        response.status(204).end();
    }
    catch(exception){
        next(exception);
    }
});

// Update by id
notesRouter.put("/:id", (request, response, next) => {
    const body = request.body;

    const note = {
        content: body.content,
        important: body.important,
    };

    Note.findByIdAndUpdate(
        request.params.id,
        note,
        { new: true, runValidators: true, context: "query" }
    )
        .then(updatedNote => {
            response.json(updatedNote);
        })
        .catch(error => next(error));
});

//function
const getTokenFrom = request => {
    const authorization = request.get("authorization");
    if(authorization && authorization.toLowerCase().startsWith("bearer "))
    {
        return authorization.substring(7);
    }

    return null;
};

module.exports = notesRouter;