import { Request } from "express"

export interface BookingRequest extends Request{
    body:{   
        user_Id: string;
        tour_Id: string;
        hotel_Id: string;
        booking_Date: Date;

    }
}

export interface Booking{
    booking_Id: string;
    user_Id: string;
    
}

