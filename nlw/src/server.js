const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}




// Configuração das funções das rotas

    // **NORMAL**
    // function pageLanding(req, res) {
    //     return res.sendFile(__dirname  + "/views/index.html") //__dirname = NLW/src pois é o diretório do script server.js
    // }
    // function pageStudy(req, res) {
    //     return res.sendFile(__dirname  + "/views/study.html") 
    // }
    // function pageGiveClasses(req, res) {
    //     return res.sendFile(__dirname  + "/views/give-classes.html")
    // }

    // **Com nunjucks**
     function pageLanding(req, res) {   // Com a defição do caminho, é preciso colocar só o nome do arquivo
        return res.render("index.html")
    }
    function pageStudy(req, res) {
        const filters = req.query // req.query = a requisição dos inputs da página
        return res.render("study.html", { proffys, filters, subjects, weekdays})
    }
    function pageGiveClasses(req, res) {
        const data = req.query

        //transformando em chaves de arrays, se tiver dados
        const isNotEmpty = Object.keys(data).length > 0
        if(isNotEmpty){

            data.subject = getSubject(data.subject)
            //adicionar data a lista de proffys
            proffys.push(data)
            return res.redirect("/study")
        }

        
        return res.render("give-classes.html", { subjects, weekdays})
    }

const express = require('express')
const server = express()


//Configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', { // Definição do caminho
    express: server,
    noCache: true,
})

server.use(express.static("public")) // Usar a pasta public pelo servidor

 //Rotas pelo backend

 // (desorganizado)
    //.get("/", (req, res) => {
    //      return res.sendFile(__dirname + "/views/index.html") })

 //(organizado)
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(5500)
