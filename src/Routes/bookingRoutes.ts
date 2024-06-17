import {Router} from "express"
import { addBooking, getBooking, getBookings } from "../Controllers/bookingController"
import { verifyToken } from "../middlewares"


const bookingRoutes = Router()

bookingRoutes.post("", verifyToken, addBooking)
bookingRoutes.post("", verifyToken, getBooking)
bookingRoutes.get("", verifyToken, getBookings)


export default bookingRoutes
