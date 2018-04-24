const express = require("express")
const app = express()

const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

const MongoClient = require("mongodb").MongoClient
const mongouser = 'nerdzaotest' 
const mongopass = 'nerdzaotest'
const mongourl = `mongodb://${mongouser}:${mongopass}@ds131151.mlab.com:31151/notepeddy`

var db;

MongoClient.connect(mongourl, (err, client) => {
    // Se houver erros
    if (err) return console.log(err)

    db = client.db('notepeddy')
   app.listen( 3000, () => {
    app.get("/", ( request, response ) => {
        db.collection("notas").find().toArray( (err, result) => {
            if( err ) return console.log( err )

            response.render( __dirname + "/app/index.ejs", { notas: result });
        })
    })

    app.post("/", ( request, response ) => {
        
        console.log( request.body )
        
        db.collection("notas").save(request.body, (err, result) => {
            if (err) return console.log(err)

            response.redirect("/");
        })
    })

    app.post("/editar", (request, response, next) => {
        // Redireciona para a home para não ter refresh neste método]
        console.log( request.body );
        db.collection('notas').findOneAndUpdate(
            { titulo_nota: request.body.titulo_nota },
            {
                $set: {
                    titulo_nota: request.body.titulo_nota + " : Lido"
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