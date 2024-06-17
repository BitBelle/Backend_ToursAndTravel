import Joi from "joi";

export const BookingSchema = Joi.object(

    {
        user_Id: Joi.string().required(),
        tour_Id: Joi.string().required(),
        hotel_Id: Joi.string().required(),
        booking_Date: Joi.string().required()
    }

)