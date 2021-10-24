const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'OlaMundo',
    database: 'alunos'
});

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou!');
})

function criarTabela(conn){
    const sql = "CREATE TABLE IF NOT EXISTS dados_alunos (" +
                "Id int NOT NULL AUTO_INCREMENT,"+
                "Nome varchar(150) NOT NULL,"+
                "CPF char (11) NOTNULL,"+
                ");";

    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('Criamos uma tabela!')
    });

    }

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('Conectou!');
    criarTabela(connection);
});