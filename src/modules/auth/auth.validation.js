import Joi from "joi"

const signupSchemaVal = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    rePassword: Joi.valid(Joi.ref('password')).required(),
    age: Joi.number().integer().min(10).max(80).required()

})

const signinSchemaVal = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),

})

export{
    signupSchemaVal,
    signinSchemaVal
}