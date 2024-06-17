import { Request, Response, RequestHandler } from 'express'
import { v4 as uid } from 'uuid'
import { sqlConfig } from '../config'
import { HotelRequest, Hotels } from '../Models/hotelModel'
import mssql from 'mssql'
import { error } from 'console'
import { DbHelper } from '../DatabaseHelpers'

const dbInstance = new DbHelper()

export const addHotel = async (req: HotelRequest, res: Response) => {
    try {
        const id = uid(); 

        const { hotel_Name, hotel_Location, hotel_Rating } = req.body;
        
        await dbInstance.exec("addHotel",{
            hotel_Id:id, 
            hotel_Name: hotel_Name, 
            hotel_Location: hotel_Location, 
            hotel_Rating: hotel_Rating
            })

        return res.status(201).json({ message: "Hotel Created" });

    } catch (error) {
        console.error("Error adding hotel:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getHotels: RequestHandler = async (req, res) => {
    try {

        const hotels = (await dbInstance.exec('getHotels',{})).recordset as Hotels[]

        res.status(200).json(hotels)

    } catch (error) {
        res.status(500).json(error)
    }
}


export const getHotel = async (req: Request<{ id: string }>, res: Response) => {
    try {

        const hotel = (await dbInstance.exec('getHotel', {hotel_Id:req.params.id})).recordset[0] as Hotels

        res.status(200).json(hotel)

    } catch (error) {
        res.status(500).json(error)
    }
}


export const updateHotel = async (req: HotelRequest, res: Response) => {
    try {

        const hotel = (await dbInstance.exec('updateHotel', {hotel_Id:req.params.id})).recordset[0] as Hotels

        const { hotel_Name, hotel_Location, hotel_Rating } = req.body;

        if (hotel && hotel.hotel_Id) {
            await dbInstance.exec('updateTour',{
                hotel_Id:req.params.id,
                hotel_Name:hotel_Name,
                hotel_Location: hotel_Location,
                hotel_Rating: hotel_Rating
            }) 

            return res.status(200).json({ message: "Hotel Updated" });
        }

        res.status(404).json({ message: "Hotel not Found" });

    } catch (error) {
        res.status(500).json(error);
    }
};



export const deleteHotel = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;

        // Check if the hotel exists
        const hotel = await dbInstance.exec('getHotel', { hotel_Id: id });

        if (hotel.recordset.length > 0) {
            // Hotel exists, DELETE
            await dbInstance.exec('deleteHotel', { hotel_Id: id });
            
            // updating isDeleted flag
            return res.status(200).json({ message: "Hotel Deleted", hotel_Id: id });
        } else {
            // Hotel not found
            res.status(404).json({ message: "Hotel not Found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
