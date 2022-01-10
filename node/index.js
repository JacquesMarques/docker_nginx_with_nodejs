const express = require("express")
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);


const createSql = `CREATE TABLE IF NOT EXISTS people(
    id int primary key auto_increment,
    name varchar(255),
)`;

connection.query(createSql, function(err, results, fields) {
    if (err) {
        console.log(err.message);
    }
});

const sql = `INSERT INTO people(name) values('Jacques')`;
connection.query(sql);

app.get('/', (req,res) => {
    let response = '<h1>Full Cycle Rocks!</h1>';
    response += '<h2>Pessoas Cadastradas</h2>';
    connection.query(`SELECT * FROM people`, function (err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        
        // if there is no error, you have the result
        for(let i=0; i < result.length; i++) {
            response += result[i].name + '<br>';
        }
        res.send(response);
  
        connection.end;
      });
});

app.listen(port, ()=> {
    console.log('Rodando na porta: ' + port)
});
