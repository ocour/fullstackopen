const notesRouter = require("express").Router();
const Note = require("../models/note");
const logger = require("../utils/logger");

// get all notes
notesRouter.get("/", (request, response) => {
    logger.info("getting all...");
    Note.find({}).then(notes => {
        response.json(notes);
    });
});

// Gets and returns one note by its id
notesRouter.get("/:id", (request, response, next) => {
    // gets id
    const id = request.params.id;
    // finds by id
    Note.findById(id)
        .then(note => {
            // Not null
            if(note)
            {
                response.json(note);
            }
            // Null
            else
            {
                response.status(404).end();
            }
        })
        // if error, passes to middleware
        .catch(error => next(error));
});

// Post/add note(s)
notesRouter.post("/", (request, response, next) => {
    const body = request.body;
    logger.info(body);

    // Create note
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    });

    // Add note
    note.save()
        .then(savedNote => {
            response.json(savedNote);
        })
        .catch(error => next(error));
});

// Deletes one note by its id
notesRouter.delete("/:id", (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            logger.info(result);
            response.status(204).end();
        })
        .catch(error => next(error));
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