import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/user.model";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(request: Response) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const userid = new mongoose.Types.ObjectId(user.id);

  try {
    const user = await UserModel.aggregate([
      { $match: { id: userid } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Messages fetched successfully",
        messages: user[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {}
}
