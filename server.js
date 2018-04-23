const nodemon = require("nodemon");

const express = require("express");
const app = express();

// Utilizaremos arrow functions do ES6
app.listen(3000, () => {
    // Servidor express iniciado com sucesso
    app.get("/", (request, response, next) => {
        response.send( __dirname + "/app/index.html");
    });

    app.post("/", (request, response, next) => {

    });

    app.put("/", (request, response, next) => {

    });

    app.delete("/", (request, response, next) => {
        
    })
});