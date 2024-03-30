import { dbConnect } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/utils/mailer";

dbConnect();

export async function POST(requset: NextRequest) {
  try {
    const reqBody = await requset.json();
    const { username, email, password } = reqBody;

    // validation
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const sevedUser = await newUser.save();
    console.log("User saved: ", sevedUser);

    // send verification email
    await sendMail({ email, emailType: "VERIFY", userId: sevedUser._id });

    return NextResponse.json(
      { message: "User registered successfully", success: true, sevedUser },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
