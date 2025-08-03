import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { registerValidator } from "../middleware/validators/registerValidator";
import { validateRequest } from '../middleware/validateRequest';
import { loginValidator } from '../middleware/validators/loginValidator';

const authRoutes = Router();

authRoutes.post("/register", registerValidator, validateRequest, register);
authRoutes.post("/login", loginValidator, validateRequest, login);

export default authRoutes;
