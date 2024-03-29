// Variables to declare/require necessary packages & files
const express = require("express");
const db = require("./db/db.json");
const fs = require("fs");
const path = require("path");


// NPM package to assign random id to each note
const { v4: uuidv4 } = require("uuid");


const app = express();
const PORT = process.env.PORT || 3001;


// Middleware for parsing JSON & urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// API Routes
// Fetch - Get Reqeust
app.get("/api/notes", (req, res) => {
    // Read db.json file & return all saved notes as JSON
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).send(data);
        }
    })
});

// Fetch - POST request
app.post("/api/notes", (req, res) => {
    // Receive new note to save on req.body, append new note to db.json, and return new note to user
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            let newNote = req.body;
            newNote.id = uuidv4();
            saveNote = JSON.parse(data);
            saveNote.push(newNote);
            fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(saveNote), (err) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(saveNote);
                }
            })
        }
    })
});

// BONUS: DELETE request
// app.delete("/api/notes/:id", (req, res) => {
    
        // Receives a query parameter that contains the id of a note to delete, reads all notes from the db.json file, removes the note with the given id property, and then rewrites the notes to the db.json file. 

// Attempted...not currently working...
//     fs.readFile("./db/db.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).json(err);
//         } else {
//             let noteId = req.params.id;
//             note.id = noteId;
//             deleteNote = JSON.parse(data);
//             deleteNote.splice(noteId);
//             fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(deleteNote), (err) => {
//                 if (err) {
//                     res.status(500).json(err);
//                 } else {
//                     res.status(200).json(deleteNote);
//                 }
//             })
//         }
//     })
// });


// HTML Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


// Starts the server
app.listen(PORT, () => console.log(`Now listening on port ${PORT}.`));