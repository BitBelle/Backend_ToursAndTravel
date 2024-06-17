import {Router} from "express"
import { addTour, deleteTour, getTour,getTours, updateTour} from "../Controllers/tourController"
import { verifyToken } from "../middlewares"

const tourRoutes = Router()

tourRoutes.post("", verifyToken, addTour)
tourRoutes.get("", getTours)
tourRoutes.get("/:id", getTour)

tourRoutes.patch("/:id", verifyToken, updateTour)
tourRoutes.delete("/:id", verifyToken, deleteTour)


export default tourRoutes