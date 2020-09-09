const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertMinutesToHours } = require('./utils/format')
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
    async function pageStudy(req, res) {
        const filters = req.query // req.query = a requisição dos inputs da página

        if (!filters.subject || !filters.weekday || !filters.time){
            return res.render("study.html", { filters, subjects, weekdays })
        }
        const timeToMinutes = convertMinutesToHours(filters.time)

        const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
        `

        //caso haja erro na hora da consulta do banco de dados

        try {
            const db = await Database
            const proffys = await db.all(query)

            return res.render('study.html', { proffys, subjects, filters, weekdays})

        } catch (error) {
            console.log(error)
        }
        
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