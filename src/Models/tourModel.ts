import { Request } from "express"

export interface TourRequest extends Request{
    body:{
        tour_Name:string
        tour_Destination:string
        tour_Description:string
        tour_Price:number
    }
}

export interface Tours{
    tour_Id:string
    tour_Name:string
}