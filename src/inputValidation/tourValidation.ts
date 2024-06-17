import Joi from 'joi'


export const TourSchema = Joi.object({
    
    tour_Name: Joi.string().required(),
    tour_Destination: Joi.string().required(),
    tour_Description: Joi.string().required(),
    tour_Price: Joi.string().required()

})