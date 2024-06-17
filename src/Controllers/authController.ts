import {Request, Response, RequestHandler} from 'express'
import {v4 as uid} from 'uuid' 
import { sqlConfig } from '../config'
import mssql from 'mssql'
import { RegisterSchema } from '../Helpers/registerSchema'
import Bcrypt from 'bcrypt'
import { Payload, User } from '../Models/authModel'
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'
import { log } from 'console'
import { ExtendedRequest1 } from '../middlewares'
import { DbHelper } from '../DatabaseHelpers'
import { UserSchema } from '../inputValidation/userValidation'

dotenv.config({path:path.resolve(__dirname,"../../.env")})

const dbInstance = new DbHelper()

export const registerUser = async (req:Request, res:Response)=>{
    try{
        const id = uid()

        
        const {user_Name, user_Email, password_Hash} = req.body
        const {error} = RegisterSchema.validate(req.body)

        if (error){
            return res.status(400).json(error.details[0].message)
        }

        const HashPassword =  await Bcrypt.hash(password_Hash,10)

        await dbInstance.exec("addUser",{
            user_Id:id, 
            user_Name:user_Name,
            user_Email:user_Email,
            password_Hash:HashPassword
            })


        return res.status(201).json({message:"User added successfully"})

    } catch (error){
        return res.status(500).json(error)

    }
    
}


export const loginUser = async(req: Request, res: Response) => {
    try {
        const { user_Name, user_Email, password_Hash } = req.body;

        //input validation
        const { error } = UserSchema.validate(req.body)
        if (error) {
            return res.status(500).json("User input validation failed! ")
        }

        let user = await dbInstance.exec("getUser", {
            user_Name: user_Name, 
            user_Email: user_Email
        });

        if (user.recordset.length !== 0) {
            const isValid = await Bcrypt.compare(password_Hash, user.recordset[0].password_Hash);

            if (isValid) {
                const payload: Payload = {
                    Sub: user.recordset[0].user_Id,
                    user_Name: user.recordset[0].user_Name
                };
                const token = await jwt.sign(payload, process.env.SECRET as string, { expiresIn: '8h' });
                return res.status(200).json({ message: "Login Successful!", token });
            }
        }

        return res.status(400).json({ message: "Invalid Credentials" });

    } catch (error) {
        return res.status(500).json(error);
    }
}


export const getUsers: RequestHandler = async (req, res) => {
    try {

        const users = (await dbInstance.exec('getUsers',{})).recordset as User[]

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json(error)
    }
}



export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const{id} = req.params
        const { user_Name, user_Email } = req.body;

        // Check if the user exists
        const user = await dbInstance.exec('getUser', { user_Id:id, user_Name:user_Name, user_Email:user_Email });

        if (user.recordset.length > 0) {
            // user exists, DELETE
            await dbInstance.exec('deleteUser', {  user_Id:id, user_Name:user_Name, user_Email:user_Email });
            
            // updating isDeleted flag
            return res.status(200).json({ message: "User Successfully Deleted", user_Id:id});
        } else {
            // user not found
            res.status(404).json({ message: "User not Found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};








export const welcomePage=(req:ExtendedRequest1, res:Response)=>{
    try{
        res.status(200).send(`<h2> Welcome ${req.info?.user_Name} </h2>`)
    
    } catch (error){
        
    }
}
