import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/user.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { code, username } = await request.json();

    const decodeUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodeUsername });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 500 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNoteExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNoteExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        { success: true, message: "Account verified successfully" },
        { status: 200 }
      );
    } else if (!isCodeNoteExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code expired please request again to get new code",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        { success: false, message: "Invalid verification code" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user", error);
    return Response.json(
      { success: false, message: "Error verifying user" },
      { status: 500 }
    );
  }
}
