import nodeMailer from "nodemailer";
import { User } from "@/models/user.models";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "verify") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpire: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpire: Date.now() + 3600000,
      });
    }

    var transport = nodeMailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    const mailOptions = {
      from: "gaurav@gmail.com",
      to: email,
      subject:
        emailType === "verify" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?tokan=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "Reset your password"
      } or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?tokan=${hashedToken} </br></p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
