import { dbConnect } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

dbConnect();

export async function POST(requset: NextRequest) {
  const userId = await getDataFromToken(requset);

  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return NextResponse.json({
      message: "User not found",
    });
  }
  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
