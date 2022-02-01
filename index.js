const express = require('express');
const Database = require('./mysqlcon');
const cors = require('cors')
const port = 3001;

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servidor OK !!!');
})

app.get('/huecas', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM huecas', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})



// Obtener solo un profesor
app.get('/huecas/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM HUECAS WHERE idhuecas = ?', [id],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})

 //REquest peticion     response  response
app.post('/huecas', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO HUECAS    
                (idhuecas, Nombre, Descripcion, WhatsApp, Ubicacion) VALUES
                 (?,?,?,?,?)`;

    cn.execute(
        query, [body.idhuecas, body.Nombre, body.Descripcion, body.WhatsApp, body.Ubicacion],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

//update
app.put('/huecas', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `UPDATE HUECAS    
                SET  Nombre=?, Descripcion=?, WhatsApp=?, Ubicacion=? 
                WHERE idhuecas = ?`;
    cn.execute(
        query, [ body.Nombre, body.Descripcion, body.WhatsApp, body.Ubicacion, body.idhuecas],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})


//----------------------------------------//

app.get('/usuarios', (req, res) => {
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM usuarios', [],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
        'SELECT * FROM HUECAS WHERE idusuarios = ?', [id],
        function (err, results, fields) {
            res.json(results[0])
        }
    );

})

app.post('/usuarios', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `INSERT INTO USUARIOS    
                (idusuarios, username, password	, status,) VALUES
                 (?,?,?,?)`;

    cn.execute(
        query, [body.idusuarios, body.username, body.password, body.status,],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})

app.put('/usuarios', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()

    const query = `UPDATE USUARIOS   
                SET  username=?, password=?, status=? 
                WHERE idusuarios = ?`;
    cn.execute(
        query, [ body.username, body.password, body.status,body.idusuarios],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
})







//Habilitamos el servidor en el puerto indicado
//En esta caso sera 3001 porque el 3000 ya es usado por React
app.listen(port, () => {
    console.log('Sevidor Express en: http://localhost:' + port);
})