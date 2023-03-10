// Variables to declare/require necessary packages & files
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET request

// POST request

// DELETE request