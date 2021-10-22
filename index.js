const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function exConsultaSQL(sqlQry, res){
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'alunos'
  });

  connection.query(sqlQry, function(error, results, field){
    if(error)
      res.json(error);
    else
      res.json(results);
    connection.end();
    console.log('foi,funcionou!');
  });

}

const router = express.Router();
router.get('/', (req, res) => res.json({message: 'Agora vai, esta funcionando!'}));
app.use('/', router);

router.get('/alunos', (req, res) =>{
  exConsultaSQL('SELECT * FROM Dados_Alunos', res);
});

app.listen(port);
console.log("Funcionou!");