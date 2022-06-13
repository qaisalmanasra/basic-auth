"use strict"; 
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();
const notFoundHandler = require("./middleware/404");
const errorHandler = require("./middleware/500");

const signInRouter=require('./auth/signIn-router');
const signUpRouter= require('./auth/signUp-router');


app.get("/",(req,res) => {
    res.send("Welcome to heroku app");
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(signInRouter);
app.use(signUpRouter);
app.use("*", notFoundHandler);
app.use(errorHandler); 

function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};