// Servidor
const express = require('express')
const server = express()

const { 
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')

//Configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', { // Definição do caminho
    express: server,
    noCache: true,
})

// Inicio e configuração do servidor
server
// receber os dados do req.body
.use(express.urlencoded({ extended: true }))
.use(express.static("public")) // Usar a pasta public pelo servidor

 //Rotas pelo backend

 // (desorganizado)
    //.get("/", (req, res) => {
    //      return res.sendFile(__dirname + "/views/index.html") })

 //(organizado)
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
// start do servidor
.listen(5500)
