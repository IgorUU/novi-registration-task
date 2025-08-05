import { Router } from 'express';

import { getCurrentUser, login, logout, register } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { loginValidator } from '../middleware/validators/loginValidator';
import { registerValidator } from "../middleware/validators/registerValidator";

const authRoutes = Router();

authRoutes.post("/register", registerValidator, validateRequest, register);
authRoutes.post("/login", loginValidator, validateRequest, login);
authRoutes.post("/logout", logout);
authRoutes.get("/me", authMiddleware, getCurrentUser);

export default authRoutes;
