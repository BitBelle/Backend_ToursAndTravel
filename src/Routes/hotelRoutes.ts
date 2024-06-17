import {Router} from "express"
import { addHotel, deleteHotel, getHotel,getHotels, updateHotel} from "../Controllers/hotelController"
import { verifyToken } from "../middlewares"
// import { isAdmin } from '../middlewares/isAdmin'


const hotelRoutes = Router()

hotelRoutes.post("", verifyToken, addHotel)
hotelRoutes.get("", getHotels)
hotelRoutes.get("/:id", getHotel)
hotelRoutes.patch("/:id", verifyToken,updateHotel)
hotelRoutes.delete("/:id", verifyToken,deleteHotel)


export default hotelRoutes