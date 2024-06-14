import { Request, Response, NextFunction } from "express";

const validateRequestBody = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if req.body is a valid JSON
    try {
      JSON.parse(JSON.stringify(req.body));
    } catch (error) {
      return res.status(400).json({ message: "Invalid JSON in request body" });
    }

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res
          .status(400)
          .json({ message: `Missing required field: ${field}` });
      }
    }
    next();
  };
};

export default validateRequestBody;
