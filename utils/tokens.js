const Token = require('../models/token');

class Tokens {
    constructor(dato) {
        this.dato = dato;
        this.unique_time = Date.now();
        this.secret = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
        const texto_plano = this.dato + this.unique_time + this.secret + Date.now();
        this.token = Buffer.from(texto_plano, 'utf8').toString("base64");
        this.used = false;
        this.expiration = new Date();
        this.expiration.setHours(this.expiration.getHours() + 24);

        Token.create({
            token: this.token,
            used: false,
            expiration: this.expiration
        });
    }

    get Token() {
        return this.token;
    }

}

module.exports = Tokens;