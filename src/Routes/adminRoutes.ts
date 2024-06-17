import { Router } from 'express';
import { assignAdminRole } from '../Controllers/adminController';
import { verifyToken } from "../middlewares/index";
import { isAdmin } from "../middlewares/isAdmin";

const adminRoutes = Router();

// Endpoint to assign admin role
// protected token verification and admin check
adminRoutes.post("", assignAdminRole);

export default adminRoutes;
