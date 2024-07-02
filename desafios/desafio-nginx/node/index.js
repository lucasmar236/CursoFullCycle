const express = require("express")
const app = express()
app.use(express.json())
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)


app.post("/",(req,res) => {
    const sql = `INSERT INTO people(name) values ?`
    const values = [[req.body.nome]]
    try {
        connection.query(sql, [values], (err, result) => {
            if (err) {
                throw err;
            }
        })
    } catch (e) {
        return res.status(500).send({"message": "Erro ao inserir"})
    }
    return res.status(201).send({"message":"Pessoa cadastrada"})
})

app.get("/", (req,res) => {
    let html =
        `<h1>Full Cycle Rocks!</h1>`;
    try {
        connection.query("select name from people", (err, results) => {
            if (err) {
                throw err;
            }
            html.concat("<ul>")
            for (let result of results){
                html = html.concat(`<li>${result.name}</li>`)
            }
            html.concat("</ul>")
            return res.send(html)
        })
    } catch (e) {
        return res.status(500).send({"message": "Erro ao inserir"})
    }
})

app.listen(port,() => {
    console.log("Aplicação rodando na porta 3000")
})