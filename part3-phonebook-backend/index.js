require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

const Person = require('./models/person');

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
    Person.find({})
    .then(notes => {
        response.json(notes);
    })
})

// gets info
app.get('/info', (request, response, next) => {
    Person.countDocuments()
        .then(length => {
            const info = `<p>Phonebook has info for ${length} people</p>
            <p>${new Date()}</p>`;
            response.send(info);
        })
        .catch(error => next(error));
})

// gets one person by id, gives 404 if not person with give id exists
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            // if not null
            if(person)
            {
                response.json(person);
            }
            else
            {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
})

// deletes single person
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            console.log(result);
            response.status(204).end();
        })
        .catch(error => next(error));

})

// When adding new person
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
    
    //persons.some(person => person.name.toLowerCase().replace(/\s/g,"") === body.name.toLowerCase().replace(/\s/g,""));

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson);
    })
})

// update by id, for example updating phone number
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
    }

    // {new:true} is an option that gives back updated person
    // otherwise the old person would be given back
    Person.findByIdAndUpdate(request.params.id, person, {new:true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error));
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
}

app.use(unknownEndpoint);

// Error handling
const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if(error.name === "CastError")
    {
        return response.status(400).send({ error: 'malformatted id' });
    }

    next(error);
}
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})