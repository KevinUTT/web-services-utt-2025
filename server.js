const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/http/public"))

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true
}))

const usersRouter = require('./routers/users');
app.use('/users', usersRouter);
//http://localhost:2025/users/register

const autorsRouter = require('./routers/autors');
app.use('/autors', autorsRouter);
//http://localhost:2025/autors/new POST

const librosRouter = require('./routers/libros');
app.use('/libros', librosRouter);
//http://localhost:2025/libros/new POST

const practicaRouter = require('./routers/practica');
app.use('/practica', practicaRouter);

app.listen(2025, async function() {
    console.log("Server iniciado :D");
});