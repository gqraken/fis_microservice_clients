const Joi = require('joi');

// Validations
function registerValidation(data){
    const registerSchema = Joi.object({
        username: Joi.string().min(3).max(32).required(), 
        password: Joi.string().min(6).max(512).required(),
        firstName: Joi.string().max(128).required(), 
        lastName: Joi.string().max(128).required(),
        email: Joi.string().min(6).max(255).required().email(),
        phone: Joi.string().required(),
        photoUrl: [Joi.string().optional(), Joi.allow(null)],
        address: Joi.string().max(255).required(),
    });

    return registerSchema.validate(data);
}

function loginValidation(data){
    const loginSchema = Joi.object({
        username: Joi.string().min(3).max(32).required(), 
        password: Joi.string().min(6).max(512).required(),
    });

    return loginSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;