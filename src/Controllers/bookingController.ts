import { Request, RequestHandler, Response } from 'express';
import { v4 as uid } from 'uuid';
import { sqlConfig } from '../config';
import mssql, { pool } from 'mssql';
import { DbHelper } from '../DatabaseHelpers';
import { Booking } from '../Models/bookingModel';


const dbInstance = new DbHelper()

// Function to add a new booking
export const addBooking = async (req: Request, res: Response) => {
    try {
        const id = uid(); 


        const { user_Id, tour_Id, hotel_Id, booking_Date } = req.body;

        // Check if the specified tour_Id is in Tours table
        const tourCheck = await dbInstance.exec("getTour",{tour_Id:tour_Id}) 

        if (tourCheck.recordset.length === 0) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        // Check if the specified hotel_Id is in the Hotels table
        const hotelCheck = await dbInstance.exec("getHotel",{hotel_Id:hotel_Id})

        if (hotelCheck.recordset.length === 0) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        
        await dbInstance.exec("addBooking",{
            booking_Id:id, 
            user_Id:user_Id, 
            tour_Id:tour_Id, 
            hotel_Id:hotel_Id,
            booking_Date:booking_Date})


        return res.status(201).json({ message: 'Booking Created'});

    } catch (error) {
        console.log('Error adding booking:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getBooking = async (req: Request<{ id: string }>, res: Response) => {
    try {

        const booking = (await dbInstance.exec('getBooking', {booking_Id:req.params.id})).recordset[0] as Booking

        res.status(200).json(booking)

    } catch (error) {
        res.status(500).json(error)
    }
}


export const getBookings: RequestHandler = async (req, res) => {
    try {

        const bookings = (await dbInstance.exec('getBookings',{})).recordset as Booking[]

        res.status(200).json(bookings)

    } catch (error) {
        res.status(500).json(error)
    }
}


export const deleteBooking = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const booking = (await dbInstance.exec('deleteBooking', {booking_Id:req.params.id})).recordset[0] as Booking

        if (booking && booking.booking_Id) {

            await dbInstance.exec('deleteBooking',{booking_Id:req.params.id})

            return res.status(200).json({ message: "Booking Deleted" });
        }

        res.status(404).json({ message: "Booking not Found" });

    } catch (error) {
        res.status(500).json(error);
    }
};
