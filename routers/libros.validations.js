const Joi = require('joi');

class LibrosValidations {
    validateNewLibro(datos_libro) {
        const schema = Joi.object({
            ISBN: Joi.string()
                .alphanum()
                .min(16)
                .max(16)
                .required(),
            title: Joi.string()
                .required(),
            autor_license: Joi.string()
                .min(12)
                .max(12)
                .required(),
            editorial: Joi.string()
                .optional(),
            pages: Joi.number()
                .optional(),
            year: Joi.number()
                .required(),
            genre: Joi.string()
                .optional(),
            language: Joi.string()
                .required(),
            format: Joi.string()
                .optional(),
            sinopsis: Joi.string()
                .optional()
        });

        return schema.validate(datos_libro);
    }
}

module.exports = LibrosValidations;