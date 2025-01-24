const UsersValidations = require('../routers/users.validations');

const validador = new UsersValidations();
const datos_usuario = {
    username: "Kevin1995",
    password: "A1234567!",
    name: "Kevin",
    lastName: "Martin Del Campo",
    secondLastName: "Fernández",
    email: "kmcf90@gmail.com"
};
const resultadoValidacion = validador.validateRegister(datos_usuario);

console.log(resultadoValidacion);