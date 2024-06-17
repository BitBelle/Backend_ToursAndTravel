import Joi from 'joi'


export const HotelSchema = Joi.object({

    hotel_Name: Joi.string().required(),
    hotel_Location: Joi.string().required(),
    hotel_Rating: Joi.string().required()

})