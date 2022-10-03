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
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    Note.findById(id).then(note => {
        response.json(note);
    })
})

// Deletes one note by its id
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id)

    response.status(204).end();
})

// Post/add note(s)
app.post('/api/notes', (request, response) => {
    // console.log(request.headers);
    const body = request.body;
    console.log(body);

    // If bodys content keys value is either null or an empty string "";
    // or doesent exist
    if(body.content === undefined)
    {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    
    // Create note
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    // Add note
    note.save().then(savedNote => {
        response.json(savedNote);
    })
})

// If request made to an route which isnt defined
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

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