const Axios = require('axios');
const config = require('../config.json');

class DeepSeek {
    constructor() {
        this.prompt = "";
    }

    async SendRequest() {
        const response = await Axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "deepseek/deepseek-chat:free",
            messages: [
                {
                    role: "user",
                    content: this.prompt
                }
            ]
        },{
            headers: {
                Authorization: "Bearer " + config.deepseek.token
            }
        });

        const choice = response.data.choices[0].message.content;
        return choice;
    }

    get Prompt() {
        return this.prompt;
    }

    set Prompt(value) {
        this.prompt = value;
    }
}

module.exports = DeepSeek;