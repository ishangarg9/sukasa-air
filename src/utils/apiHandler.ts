import { Response } from "express";

enum APIStatus {
  SUCCESS = "success",
  ERROR = "error",
}

interface ApiResponse {
  status: APIStatus;
  message: string;
  data?: any;
  error?: any;
}

export const sucessResponseHandler = (
  res: Response,
  message: string,
  data: any = null,
  statusCode: number = 200
) => {
  const response: ApiResponse = {
    status: APIStatus.SUCCESS,
    message,
    data,
  };
  res.status(statusCode).json(response);
};

export const errorResponseHandler = (
  res: Response,
  message: string,
  error: any = null,
  statusCode: number = 400
) => {
  const response: ApiResponse = {
    status: APIStatus.ERROR,
    message,
    error,
  };
  res.status(statusCode).json(response);
};
