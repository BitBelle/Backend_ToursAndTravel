import Joi from "joi";

export const UserSchema = Joi.object(

    {
        user_Name: Joi.string().required(),
        user_Email: Joi.string().required(),
        password_Hash: Joi.string().required()
    }

)