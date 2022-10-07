const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

const Note = require("../models/note");

// deletes all from database and adds notes, done after each test
beforeEach(async () => {
    await Note.deleteMany({});

    let noteObject = new Note(helper.initialNotes[0]);
    await noteObject.save();

    noteObject = new Note(helper.initialNotes[1]);
    await noteObject.save();
});

test("notes are returned as json", async () => {
    await api
        .get("/api/notes")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
    const response = await api.get("/api/notes");

    expect(response.body).toHaveLength(helper.initialNotes.length);
});

test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");

    const contents = response.body.map(r => r.content);

    expect(contents).toContain("Browser can execute only Javascript");
});

test("a valid note can be added", async () => {
    const newNote = {
        content: "async/await simplifies making async calls",
        important: true,
    };

    await api
        .post("/api/notes")
        .send(newNote)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map(n => n.content);
    expect(contents).toContain("async/await simplifies making async calls");
});

test("note without content is not added", async () => {
    const newNote = {
        important: true,
    };

    await api
        .post("/api/notes")
        .send(newNote)
        .expect(400);

    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

test("a specific note can be viewed", async () => {
    // gets all notes from database
    const notesAtStart = await helper.notesInDb();

    // picks first one
    const noteToView = notesAtStart[0];

    // gets note from database with picked notes id
    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

    // makes picked to json, and compares the two
    const processedNoteToView = JSON.parse(JSON.stringify(noteToView));
    expect(resultNote.body).toEqual(processedNoteToView);
});

test("a note can be deleted", async () => {
    // gets notes from database
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    // deletes note with id
    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204);

    // gets notes from database
    const notesAtEnd = await helper.notesInDb();

    // compares length to see if one was deleted from database
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

    // checks/compares if notes in database contains deleted note
    const contents = notesAtEnd.map(r => r.content);
    expect(contents).not.toContain(noteToDelete.content);
});

afterAll(() => {
    mongoose.connection.close();
});