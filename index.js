const mysql = require('mysql2')
const express = require('express')
const bodyParser = require('body-parser')


const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static('public'));
    

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'estoque'
});

connection.connect(function(err){
    if (err){
        console.error('erro', err)
        return
    }
console.log("Conexão estabelecida com sucesso")   
 }
)


app.get("/formulario",function (req, res) {
    res.sendFile(__dirname + "/formulario.html");
})

app.post('/adicionar', (req, res) =>{
    const descricao = req.body.descricao;
    const quantidade = req.body.quantidade;
    const valor = req.body.valor;
    const peso = req.body.peso;
    const medida = req.body.medida;
    const endereco= req.body.endereco ;


    const values = [descricao, quantidade, valor, peso, medida, endereco]
    const insert = "insert into materiais(descricao, quantidade, valor, peso, medida, endereco) values(?,?,?, ?, ?, ?)";

    connection.query(insert, values, function(err, result) {
        if (!err) {
        console.log("dados inseridos com sucesso!")
        //res.send("dados inseridos");
        res.send(`
        <html>
        <head>
        </head>
            <body>
                      <input type='button' value='Cadastrar novo' onclick='history.go(-1)' />
                      <button onclick="window.location.href = 'http://localhost:8081/listar'">Relatorio</button>
            </body>
        </html>
        `);        
        }
    else{
        console.log("Não foi possivel inserir os dados", err)
        res.send("erro!");
        }
    })
})

app.listen(8081, function(){
    console.log("servidor rodando na url: http://localhost:8081") 
})


app.get("/listar", function(req, res){
    const selectAll = "select * from materiais";

    connection.query(selectAll, function(err, rows){
        if (!err) {
        console.log("dados inseridos com sucesso!")
        res.send(`
        <html>
            <head>
                <title>Cadastro de Materiais</title>
            </head>
            <body>
             <link rel="stylesheet" type= "text/css" href="/style.css">
                <h1>Estoque</h1>
                <header>
        
    <h1>Sistema de gerenciamento de materiais no estoque</h1>
    <p> <a href= "http://localhost:8081/formulario"> cadastrar materiais </a></p>
    <p> <a href= "http://localhost:8081/listar"> Relatorio de Estoque </a></p>
    <title>Relatorio de Estoque: </title>
       
</header>
                    <table>
                    <tr>
                    <th>codigo</th>
                    <th>descricao</th>
                    <th>quantidade</th>
                    <th>valor</th>
                    <th>peso</th>
                    <th>medida</th>
                    <th>endereco</th>
                    </tr>
                    ${rows.map(row =>`
                    <tr>
                        <td>${row.codigo}</td>
                        <td>${row.descricao}</td>
                        <td>${row.quantidade}</td>
                        <td>${row.valor}</td>
                        <td>${row.peso}</td>
                        <td>${row.medida}</td>
                        <td>${row.endereco}</td>     
                    </tr>
                `).join('')}
                </table>
            </tr>
            </body>
        </html>            
        `);
        }else{
        console.log("erro ao listar os dados!", err)
        res.send("erro!")
        }
    })
    
    })
    
    
app.get("/", function(req, res) {
    res.send(`
        <html>
        <link rel="stylesheet" type= "text/css" href="/style.css">
            <head>
           
                <title>Sistema de gerenciamento de Materiais no estoque</title>
            </head>
            <body>
           
                <h1>Sistema de gerenciamento de materiais no estoque</h1>
                <p> <a href= "http://localhost:8081/formulario"> Cadastrar materiais </a></p>
                <p> <a href= "http://localhost:8081/listar"> Relatorio de Estoque </a></p>

            </body>
        </html>
        `)
})






//npm init --criar o package.json (arquivo com info dos projetos)
//npm install --save mysql2 -- dependencia para conexão sql
//npm install express mysql2 -- dependencia para conexão front, back