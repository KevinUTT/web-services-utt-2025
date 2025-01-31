const GMail = require("../utils/gmail");

correo = new GMail();
correo.To = "kmartinez@utt.edu.mx";
correo.Subject = "Test";
correo.Message = "Hola, es una prueba";

(async () =>{
    await correo.Send();
})();