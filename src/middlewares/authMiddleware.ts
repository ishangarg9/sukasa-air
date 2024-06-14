import { Request, Response, NextFunction } from "express";

import User from "../models/user";
import { ADMIN_EMAIL } from "../constants/admin";
import { parseToken } from "../utils/tokenParser";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No Token Attached" });
  }

  try {
    const decoded: any = parseToken(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("Unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.email === ADMIN_EMAIL) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};

export { authMiddleware, adminMiddleware };
