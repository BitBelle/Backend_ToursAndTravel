import { Request, Response } from 'express';
import mssql from 'mssql';
import { sqlConfig } from '../config';
import { DbHelper } from '../DatabaseHelpers';

const dbInstance = new DbHelper()

export const assignAdminRole = async (req: Request, res: Response) => {
    
        const { user_Id } = req.body;

    try {

        await dbInstance.exec("updateUser",{ user_Id:user_Id})

        // const pool = await mssql.connect(sqlConfig);
        // const result = await pool.request()
        //     .input('user_Id', mssql.VarChar, user_Id)
        //     .query('UPDATE Users SET isAdmin = 1 WHERE user_Id = @user_Id');

        return res.status(200).json({ message: 'Admin role assigned successfully' });
    } catch (error) {
        console.error('Error assigning admin role:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
