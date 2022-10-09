/* eslint-disable no-unused-vars */
const notesRouter = require("express").Router();
const Note = require("../models/note");
const logger = require("../utils/logger");

// get all notes
notesRouter.get("/", async (request, response) => {
    const notes = await Note.find({});
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
    const body = request.body;
    logger.info(body);

    // Create note
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    });

    //add note
    try {
        const savedNote = await note.save();
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

module.exports = notesRouter;