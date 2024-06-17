import {Request, Response, RequestHandler} from 'express'
import {v4 as uid} from 'uuid' 
import { sqlConfig } from '../config'
import { TourRequest, Tours } from '../Models/tourModel'
import mssql from 'mssql'
import { error } from 'console'
import { DbHelper } from '../DatabaseHelpers'
import { TourSchema } from '../inputValidation/tourValidation'

const dbInstance = new DbHelper()

export const addTour = async(req:TourRequest, res:Response)=>{
    try{
        const id = uid()
        
        // console.log(req.body);

        //input validation
        const {error} =TourSchema.validate(req.body)
        if (error){
            return res.status(500).json("Tour Input Validation Failed!")
        }
            
        const {tour_Name,tour_Destination,tour_Description, tour_Price} = req.body

        if (!tour_Name || !tour_Destination || !tour_Description || !tour_Price) {
            return res.status(400).json({message: "All fields are required"});
        }

        await dbInstance.exec("addTour",{
            tour_Id:id, 
            tour_Name:tour_Name, 
            tour_Destination:tour_Destination, 
            tour_Description:tour_Description,
            tour_Price:tour_Price})

        return res.status(201).json({mesage: "Tour Created"})

    }catch (error){

        res.status(500).json(error)

    }   
}

export const getTours:RequestHandler = async(req,res) =>{
    try{

        const tours = (await dbInstance.exec('getTours',{})).recordset as Tours[]

        res.status(200).json(tours)

    }catch (error){
        res.status(500).json(error)
    }
}

export const getTour = async(req:Request<{id:string}>,res:Response) =>{
    try{
        const tour = (await dbInstance.exec('getTour', {tour_Id:req.params.id})).recordset[0] as Tours

        res.status(200).json(tour)

    }catch (error){
        res.status(500).json(error)
    }
}


export const updateTour = async (req: TourRequest, res: Response) => {
    try {

        const tour = (await dbInstance.exec('updateTour', {tour_Id:req.params.id})).recordset[0] as Tours

        //input validation
        const {error} =TourSchema.validate(req.body)
        if (error){
            return res.status(500).json("Tour Input Validation Failed!")
        }

        if (tour && tour.tour_Id) {
            
            const { tour_Name, tour_Destination, tour_Description, tour_Price } = req.body;

            if (tour && tour.tour_Id) {
                await dbInstance.exec('updateTour',{
                    tour_Id:req.params.id,
                    tour_Name:tour_Name,
                    tour_Destination: tour_Destination,
                    tour_Description: tour_Description,
                    tour_Price: tour_Price 
                })
                return res.status(200).json({ message: "Tour Updated" });          
        }
    }

        res.status(404).json({ message: "Tour not Found" });

    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteTour = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const tour = (await dbInstance.exec('getTour', {tour_Id:req.params.id})).recordset[0] as Tours

        if (tour && tour.tour_Id) {
            
            await dbInstance.exec('getTour',{tour_Id:req.params.id})

            return res.status(200).json({ message: "Tour Deleted" })
        }

        res.status(404).json({ message: "Tour not Found" });

    } catch (error) {
        res.status(500).json(error);
        // console.log(error)
    }
};