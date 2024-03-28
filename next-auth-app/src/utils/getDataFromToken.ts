import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (requset: NextRequest) => {
  try {
    const token = requset.cookies.get("token")?.value || "";
    const decodeToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodeToken.id;
  } catch (error: any) {
    return null;
  }
};
