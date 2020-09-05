const Database = require("./database/db")

const { subjects, weekdays, getSubject } = require('./utils/format')
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

        const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1; 
        `

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

module.exports = { 
    pageLanding,
    pageStudy,
    pageGiveClasses 
}