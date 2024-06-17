import { Request } from "express"

export interface HotelRequest extends Request{
    body:{
        hotel_Name:string
        hotel_Location:string
        hotel_Rating:string
    }
}

export interface Hotels{
    hotel_Id:string
    hotel_Name:string
}