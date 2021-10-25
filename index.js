const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql2');

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
app.use('/alunos', router.get);
app.use('/alunos/:id?', router.get);
app.use('/alunos/:id', router.delete);
app.use('/alunos', router.post);
app.use('/alunos/:id', router.patch);

router.get('/alunos', (req, res) =>{
  exConsultaSQL('SELECT * FROM dados_alunos', res);
});

router.get('/alunos/:id?', (req, res) => {
  let filter = '';
  if (req.params.id) filter = ' WHERE ID = ' + parseInt(req.params.id);
  exConsultaSQL('SELECT * FROM dados_alunos' + filter, res);
})

router.delete('/alunos/:id', (req, res) => {
  exConsultaSQL('DELETE FROM dados_alunos WHERE Id=' + parseInt(req.params.id), res);
});

router.post('/alunos', (req, res) => {
  const nome = req.body.nome.substring(0, 150);
  const cpf = req.body.cpf.substring(0, 11);
  exConsultaSQL(`INSERT INTO dados_alunos (Nome, CPF) VALUES ('${nome}', '${cpf}')`, res);
});

router.patch('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const nome = req.body.nome.substring (0, 150);
  const cpf = req.body.cpf.substring(0, 11);
  exConsultaSQL(`UPDATE dados_alunos SET Nome = '${nome}', CPF = '${cpf}' WHERE ID = ${id}`, res);
});


//inicia o servidor
app.listen(port);
console.log("Funcionou!");