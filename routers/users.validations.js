const Joi = require('joi');

class UsersValidations {
    validateRegister(user_data) {
        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(6)
                .max(24)
                .required(),
    
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-ZÑñ0-9_\.\!\$#%@]{1,16}$'))
                .required(),

            name: Joi.string()
                .pattern(new RegExp('^[áéíóúÁÉÍÓÚa-zA-ZÑñ\\s]{1,256}$'))
                .required(),

            lastName: Joi.string()
                .pattern(new RegExp('^[áéíóúÁÉÍÓÚa-zA-ZÑñ\\s]{1,256}$'))
                .optional(),

            secondLastName: Joi.string()
                .pattern(new RegExp('^[áéíóúÁÉÍÓÚa-zA-ZÑñ\\s]{1,256}$'))
                .optional(),

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required()
        })        
        
        return schema.validate(user_data);
    }
}

module.exports = UsersValidations;