const Joi = require('joi');

class AutorsValidations {
    validateNewAutor(autor_data) {
        const schema = Joi.object({
            license: Joi.string()
                .min(12)
                .max(12)
                .required(),
    
            name: Joi.string()
                .required(),
            lastName: Joi.string()
                .optional(),
            secondLastName: Joi.string()
                .optional(),
            year: Joi.number()
                .optional()
        })        
        
        return schema.validate(autor_data);
    }
}

module.exports = AutorsValidations;