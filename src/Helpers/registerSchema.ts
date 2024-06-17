import Joi from 'joi'


export const RegisterSchema = Joi.object({

    user_Name:Joi.string().required(),
    user_Email:Joi.string().required().email(),
    password_Hash:Joi.string().required().pattern(
        new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    )
        
})


