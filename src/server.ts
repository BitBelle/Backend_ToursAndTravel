import express,{json} from 'express'
import authRoutes from './Routes/authRoutes'
import tourRoutes from './Routes/tourRoutes'
import hotelRoutes from './Routes/hotelRoutes'

import cron from 'node-cron'
import {run} from './EmailService'
import adminRoutes from './Routes/adminRoutes'
import bookingRoutes from './Routes/bookingRoutes'

const app= express()

cron.schedule('*/10 * * * *', async () => {
    await run();
});


// middleware
app.use(json())

// app.use(express.json());

// routes
app.use("/tour", tourRoutes)
app.use("/hotel", hotelRoutes)
app.use("/auth", authRoutes)
app.use("/assign-admin", adminRoutes)
app.use("/booking", bookingRoutes)


app.listen(4000,()=>{
    console.log("Serverr Running...");
    
})

