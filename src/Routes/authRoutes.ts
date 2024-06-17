import { Router } from "express";
import { registerUser,loginUser, welcomePage, deleteUser, getUsers} from "../Controllers/authController";
import { verifyToken } from "../middlewares";


const authRoutes = Router()

authRoutes.post("/register", registerUser)
authRoutes.post("/login", loginUser)
authRoutes.get("", verifyToken, welcomePage)
authRoutes.get("/users", verifyToken, getUsers)

authRoutes.delete("/:id", verifyToken, deleteUser)




export default authRoutes