export interface User{
    user_Id:string,
    user_Name:string,
    user_Email:string,
    password_Hash:string,
    isDeleted:number,
    isEmailSent:number,
    isAdmin:number

}

export interface Payload{
    [x: string]: any
    Sub:string,
    user_Name:string

}

