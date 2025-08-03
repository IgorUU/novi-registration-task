import { Router } from 'express';
import { register } from '../controllers/auth.controller';
import { registerValidator } from "../middleware/validators/registerValidator";
import { validateRequest } from '../middleware/validateRequest';

const authRoutes = Router();

authRoutes.post("/register", registerValidator, validateRequest, register);

export default authRoutes;
