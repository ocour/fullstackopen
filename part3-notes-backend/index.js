require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

const Note = require('./models/note');

// Custom middleware
const requestLogger = (request, response, next) => {
    console.log('Method', request.method);
    console.log('Path: ', request.path);
    console.log('Body: ', request.body);
    console.log('---');
    next();
}
app.use(requestLogger);

// root 
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// Gets and returns all notes
app.get('/api/notes', (request, response) => {
    Note.find({})
        .then(notes => {
            response.json(notes);
        })
})

// Gets and returns one note by its id
app.get('/api/notes/:id', (request, response, next) => {
    // gets id
    const id = request.params.id;
    // finds by id
    Note.findById(id).then(note => {
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
})

// Deletes one note by its id
app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            console.log(result);
            response.status(204).end();
        })
        .catch(error => next(error));
})

// Post/add note(s)
app.post('/api/notes', (request, response, next) => {
    // console.log(request.headers);
    const body = request.body;
    console.log(body);
    
    // Create note
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    // Add note
    note.save()
        .then(savedNote => {
            response.json(savedNote);
        })
        .catch(error => next(error));
})

// Update by id
app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body;

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate
        (
            request.params.id, 
            note, 
            { new: true, runValidators: true, context: 'query' }
        )
        .then(updatedNote => {
            response.json(updatedNote);
        })
        .catch(error => next(error));
})

// If request made to an route which isnt defined
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}
// handles unknown requests
app.use(unknownEndpoint);

// error handling
const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if(error.name === 'CastError')
    {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if(error.name === "ValidationError")
    {
        return response.status(400).json({ error: error.message });
    }

    next(error);
}
// errorHandler needs to be the last middleware loaded
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

const generateId = () => {
    // Get largest id in notes, so that we can add new id to posted/added note
    const maxId = notes.length > 0
        ? Math.max(...notes.map(note => note.id))
        : 0;
    return maxId + 1;
}