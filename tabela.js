const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: '127.0.0.1',
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
                "ID int NOT NULL AUTO_INCREMENT,"+
                "Nome varchar(150) NOT NULL,"+
                "CPF char (11) NOT NULL"+
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