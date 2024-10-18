import Login from "@/components/auth/Login";
import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import axios from "axios";
// async function back() {
//   // await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL)
//   const { data } = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL!);
//   console.log(data);
//   return JSON.stringify(data);
// }
export default async function login() {
  const session = await getServerSession(authOptions);
  if (session !== null) {
    redirect("/dashboard");
  }
  // const [dataa, setData] = useState("");
  // const dataa = await back();

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full md:w-[550px] shadow-md rounded-xl py-5 px-10 bg-white">
        <div>
          <h1 className="text-4xl text-center font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
            Clash
          </h1>
          <h1 className="text-3xl font-bold">Login</h1>
          <p>Welcome back</p>
          {/* <p>Welcome: {dataa}</p> */}

          {/* <button onClick={back}>Back</button> */}
        </div>
        <Login />
        <p className="text-center mt-2">
          Don't have an account ?{" "}
          <strong>
            <Link href="/register">Register</Link>
          </strong>
        </p>
      </div>
    </div>
  );
}
