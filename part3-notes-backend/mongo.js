/* eslint-disable no-undef */
// HELPER NOT IMPORTANT TO WORK

const mongoose = require("mongoose");

if(process.argv.length < 3)
{
    console.log("Please provide the password as an argument: node mongo.js <password>");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://ocourt:${password}@cluster0.htl8ppj.mongodb.net/noteApp?retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// Add new note
mongoose
    .connect(url)
    .then(() => {
        console.log("connected");

        const note = new Note({
            content: "Callback-functions suck",
            date: new Date(),
            important: true,
        });

        return note.save();
    })
// if note was successfully saved
    .then((result) => {
        console.log("note saved!", result);
        return mongoose.connection.close();
    })
// if error
    .catch((err) => console.log(err));

// Get notes and print them to the console
mongoose
    .connect(url)
    .then(() => {
        Note.find({ content: "HTML is Easy" })
            .then(result => {
                result.forEach(note => {
                    console.log(note);
                });
                mongoose.connection.close();
            });
    });