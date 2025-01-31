const axios = require('axios');
const config = require('../config.json');

class GMail {
    constructor() {
        this.from = "Servicio De Información <uttorreon2025@gmail.com>";
        this.to = null;
        this.subject = null;
        this.date = null;
        this.messageId = "<uttorreon2025@gmail.com>"
        this.message = null;

        this.api_key = config.google_services.api_key;
        this.api_token = config.google_services.token;
    }

    async Send() {
        this.date = (new Date()).toUTCString();
        const formato_correo = 
            `From: ${this.from}\n` +
            `To: ${this.to}\n` +
            `Subject: ${this.subject}\n` +
            `Date: ${this.date}\n` +
            `Message-ID: ${this.messageId}\n\n` +
            `${this.message}`;

        try {
            await axios.post('https://gmail.googleapis.com/gmail/v1/users/me/messages/send?key=' + this.api_key,{
                raw: Buffer.from(formato_correo, 'utf8').toString('base64')
            }, {
                headers: {
                    Authorization: "Bearer " + this.api_token,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
        } catch(error) {
            console.log(error);
        }
    }

    get From() {
        return this.from;
    }

    get To() {
        return this.to;
    }

    set To(value) {
        this.to = value;
    }

    get Subject() {
        return this.subject;
    }

    set Subject(value) {
        this.subject = value;
    }

    get Date() {
        return this.date;
    }

    set Date(value) {
        this.date = value;
    }

    get MessageID() {
        return this.messageId;
    }

    set MessageID(value) {
        this.messageId = value;
    }

    get Message() {
        return this.message;
    }

    set Message(value) {
        this.message = value;
    }
}

module.exports = GMail;