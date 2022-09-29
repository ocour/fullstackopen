const express = require('express');
const app = express();

app.use(express.json());

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }
]

// root 
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// Gets and returns all notes
app.get('/api/notes', (request, response) => {
    response.json(notes);
})

// Gets and returns one note
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id);
    
    // If note was found
    if(note)
    {
        return response.json(note);
    }
    // if not send 404 message
    else
    {
        return response.status(404).end();
    }
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
    if(!body.content)
    {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    
    // Create note
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    // Add note
    notes = notes.concat(note);

    // Sends back note
    response.json(note);
})

const PORT = 3001;
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