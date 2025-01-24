const express = require('express');
const app = express();
app.use(express.json());

const usersRouter = require('./routers/users');
app.use('/users', usersRouter);
//http://localhost:2025/users/register


app.listen(2025, async function() {
    console.log("Server iniciado :D");
});