import jwt from "jsonwebtoken";
export const parseToken = (token: string) => {
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
  return decoded;
};
