/**
 * Requires
 */

 // Reinicia automaticamente o servidor após alguma alteração
const nodemon = require("nodemon")
// Servidor Express
const express = require("express")
const app = express()
// Body parser para podermos ler os dados submetidos
const bodyparser = require("body-parser")
// Adicionaremos o mongodb para gerenciar o nosso banco de dados
const MongoClient = require("mongodb").MongoClient
const mongouser = 'nerdzaotest' 
const mongopass = 'nerdzaotest'
const mongourl = `mongodb://${mongouser}:${mongopass}@ds131151.mlab.com:31151/notepeddy`
// Variável que instanciara o banco de dados
var db;

/**
 * Middlewares e Plugins
 */
// Adicionaremos o body-parser como middleware
app.use(bodyparser.urlencoded({extended: true}))
// Após instalar o EJS, vamos inseri-lo na nossa aplicação como uma view engine, um renderizador
app.set('view engine', 'ejs')

// Inicialização do banco de dados
MongoClient.connect(mongourl, (err, client) => {
    // Se houver erros
    if (err) return console.log(err)
    
    // Em caso de sucesso
    db = client.db('notepeddy') // Aqui conectamos a base de dados

    // Utilizaremos arrow functions do ES6
    app.listen(3000, () => {
        // Servidor express iniciado com sucesso
        // READ
        app.get("/", (request, response, next) => {
            var locals;
            db.collection("notas").find().toArray( function(err, result) {
                response.render( __dirname + "/app/index.ejs", {notas: result});
            });
            
            // Método anterior, sem banco de dados e sem template engine
            //response.sendFile( __dirname + "/app/index.html")
        })
        
        // CREATE
        app.post("/", (request, response, next) => {
            db.collection("notas").save(request.body, (err, result) => {
                if (err) return console.log(err)
            })

            // Redireciona para a home para não ter refresh neste método
            response.redirect("/");
        })
        
        // UPDATE
        app.post("/editar", (request, response, next) => {
            // Redireciona para a home para não ter refresh neste método]
            console.log( request.body );
            db.collection('notas').findOneAndUpdate(
                { titulo_nota: request.body.titulo_nota },
                {
                    $set: {
                        titulo_nota: request.body.titulo_nota + " : Marcado"
                    }
                },
                {
                    upsert: false // Caso não localize um registro, não insere um novo documento
                },
                ( err, result ) => {
                    if (err) return console.log(err)
                    console.log( result )
                    response.redirect("/")
                }
            )
        })
        
        // DELETE
        app.post("/deletar", (request, response, next) => {
            // Redireciona para a home para não ter refresh neste método
            // Para remover, utilizamos a collection, com o método remove( query, atributos )
            db.collection("notas").remove(
                { titulo_nota : request.body.titulo_nota },
                { justOne: true }
            )
            response.redirect("/");
        })
    })
})
