import AuthService from "../services/authService";
import { LoginRequest } from "../types/requests";
import {
  errorResponseHandler,
  sucessResponseHandler,
} from "../utils/apiHandler";
import { Request, Response } from "express";

class AuthController {
  async login(req: Request, res: Response) {
    const { email } = req.body as LoginRequest;

    try {
      const token = await AuthService.login(email);
      sucessResponseHandler(res, "Login Successfull", { token });
    } catch (e) {
      const error = e as Error;
      errorResponseHandler(res, error.message);
    }
  }
}

export default new AuthController();
