import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { Payload } from '../Models/authModel';
import { sqlConfig } from '../config';
import mssql from 'mssql';

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export interface ExtendedRequest1 extends Request {
    info?: Payload;
    isAdmin?: boolean;
}

export async function verifyToken(req: ExtendedRequest1, res: Response, next: NextFunction) {
    try {
        

        // Reading token from headers
        
        const token = req.headers['token'] as string
        // const token = req.headers['authorization']?.split(' ')[1];
        
        
        // console.log('Authorization Header:', req.headers['authorization']);

        // If there's no token
        if (!token) {
            return res.status(401).json({ message: 'No access token provided' });
        }

        // Decoding data in token
        const decodedData = jwt.verify(token, process.env.SECRET as string) as Payload;
        req.info = decodedData;
        console.log(decodedData);

        // Fetching user details including isAdmin status from database
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request()
            .input('user_Id', decodedData.Sub)
            .query('SELECT isAdmin FROM Users WHERE user_Id = @user_Id');

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.isAdmin = result.recordset[0].isAdmin === 1;

        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


