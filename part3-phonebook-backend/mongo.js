const mongoose = require('mongoose');

if(process.argv.length < 3)
{
    console.log("Please provide the password as an argument: node mongo.js <password>");
    process.exit(1);
}

let name = null;
let number = null;

const password = process.argv[2];

// Update values if they exist
if(process.argv.length > 3)
{
    name = process.argv[3];
}

if(process.argv.length > 4)
{
    number = process.argv[4];
}

const url = `mongodb+srv://ocourt:${password}@cluster0.ec5i2m9.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema);

// Only add person if name and number are not null
if(name !== null && number !== null)
{
    mongoose
    .connect(url)
    .then((result) => {
        console.log('Connected');

        const person = new Person({
            name: name,
            number: number,
        })

        return person.save();
    })
    // if note was successfully saved
    .then((result) => {
        console.log(`Added ${result.name} number ${result.number} to phonebook`);
        return mongoose.connection.close();
    })
    // if error
    .catch((err) => console.log(err));
}

if(name === null || number === null)
{
    mongoose
        .connect(url)
        .then((result) => {
            Person.find({})
                .then((result) => {
                    console.log("phonebook:");
                    result.forEach(person => {
                        console.log(`${person.name} ${person.number}`);
                    })

                    mongoose.connection.close();
                })

                console.log("This will be run before the second .then");
        })
}

console.log("program finished. or did it?");

