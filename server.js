// Variables to declare/require necessary packages & files
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON & urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// HTML Routes
app.get("/", (req, res) => {
    res.sendFile("./public/index.html");
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})


// API Routes
// Get Reqeust
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.json(err).status(500);
        } else {
            res.send(data).status(200);
        }
    });
})

// POST request
app.post("/api/notes", (req, res) => {

})

// BONUS: DELETE request


app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));