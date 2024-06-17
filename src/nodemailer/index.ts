// npm i nodemailer @types/nodemailer
// npm i ejs

//import { error, log } from 'console'
import nodemailer from 'nodemailer'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../.env")})



// Creating a config object
let config= {
    host:"smtp.gmail.com",
    service:"gmail",
    port:587,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
}


// Creating a transporter
function createTransporter(config:any){
    return nodemailer.createTransport(config)
}


// sending email
async function sendEmail(messageOption:any){
    let transporter = createTransporter(config)
    await transporter.verify()

    await transporter.sendMail(messageOption, (err, info)=>{
        if (err){
            console.log(err)
        }
        console.log(info)
    })
}

// let messageOption ={
//     to:process.env.EMAIL,
//     from:process.env.EMAIL,
//     cc:'',
//     bcc:[],
//     subject:"Testing",
//     html: '<h2>Hello World</h2>'
// }

// sendEmail(messageOption)