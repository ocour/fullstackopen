const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// custom token
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

// use morgan
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body'))

// root
app.get('/', (request, response) => {
    response.send('<h1>Root</h1>');
})

// gets all persons
app.get('/api/persons', (request, response) => {
    response.json(persons);
})

// gets info
app.get('/info', (request, response) => {
    const info = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`;
    response.send(info);
})

// gets one person by id, gives 404 if not person with give id exists
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if(person)
    {
        return response.json(person);
    }
    else
    {
        return response.status(404).end();
    }
})

// deletes single person
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();

})

app.post('/api/persons', (request, response) => {
    const body = request.body;

    // if given name or number is missing or empty string ""
    // return status code 400 and error message in json
    if(!body.name || !body.number)
    {
        return response.status(400).json({
            error: "name or body missing"
        })
    }

    // Checks if person with name already exists
    // case insensitive and whitespace insensitive
    const existingPerson = persons.some(person => 
        person.name.toLowerCase().replace(/\s/g,"") === body.name.toLowerCase().replace(/\s/g,""));

    // returns error message if person with given name exists
    if (existingPerson)
    {
        return response.status(400).json({
            error: "person with name already exists"
        })
    }

    const person = {
        id: Math.floor(Math.random() * 100000),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person);

    response.json(person);
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
}

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})