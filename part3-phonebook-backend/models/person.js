const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose.connect(url)
    .then(result => {
        console.log('connected to mongodb');
    })
    .catch(error => {
        console.log('error connecting to mongodb:', error.message);
    })


function validator(num) {
    const numberArray = num.split("-");

    // Checks that first part of number is either 2 or 3
    const lengthIs2Or3 = (numberArray[0].length === 2 || numberArray[0].length === 3);
    
    // if number consists of two parts
    if(numberArray.length === 2)
    {
        if(lengthIs2Or3)
        {
            // checks whether number constains only digits/numbers
            const isnum = numberArray.every(number => /^\d+$/.test(number));

            if(isnum)
            {
                return true;
            }
        }
    }
    
    return false;
}

const validateNumber = [validator, '{PATH}: {VALUE} is wrong, example of correct number: 012-1234567'];

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: validateNumber,
        required: true
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema);