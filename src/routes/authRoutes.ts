import { Router } from "express";
import AuthController from "../controllers/authController";
import validateRequestBody from "../middlewares/validationMiddleware";

const router = Router();

router.post("/login", validateRequestBody(["email"]), AuthController.login);

export default router;
