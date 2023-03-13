// Variables to declare/require necessary packages & files
const express = require("express");
const db = require("./db/db.json");
const fs = require("fs");
const path = require("path");
// const generateUniqueId = require("generate-unique-id");

const app = express();
const PORT = process.env.PORT || 3001;


// Middleware for parsing JSON & urlencoded data
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// HTML Routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})


// API Routes
// Fetch - Get Reqeust
app.get("/api/notes", (req, res) => {
    // Read db.json file & return all saved notes as JSON
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.json(err).status(500);
        } else {
            res.send(data).status(200);
        }
    })
});


// Fetch - POST request
app.post("/api/notes", (req, res) => {
    // Receive new note to save on req.body, append new note to db.json, and return new note to user
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.json(err).status(500);
        } else {
            let newNote = req.body;
            let savedNote = JSON.parse(data);
            savedNote.push(newNote);

            fs.writeFile("/db/db.json", JSON.stringify(savedNote), (err) => {
                if (err) {
                    res.json(err).status(500);
                } else {
                    res.json(savedNote).status(200);
                }
            })
        }
    })
});

// BONUS: DELETE request
// code starts here...

// Starts the server
app.listen(PORT, () => console.log(`Now listening on port ${PORT}.`));