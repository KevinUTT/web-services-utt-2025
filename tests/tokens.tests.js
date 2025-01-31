const Tokens = require("../utils/tokens");

token = new Tokens();
enlace_activar = "http://localhost:2025/users/activate/" + token.Token;
enlace_cancelar = "http://localhost:2025/users/deny/" + token.Token;

console.log(enlace_activar);
console.log(enlace_cancelar);