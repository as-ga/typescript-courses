'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useRouter } from "next/router";
import Link from "next/link";

export default function VerifyEmailPage() {
  // const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("api/users/verifyemail", { token });
      console.log("Verify email success", response.data);
      setVerified(true);
      setError(false);
    } catch (error: any) {
      console.log(error);
      setError(true);
      console.log("Verify email error", error.response.data);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  // useEffect(() => {
  // const urlToken = window.location.search.split("=")[1];
  // setToken(urlToken || "");
  //   const {query} = router;
  //   const urlToken = query.token;
  //   setToken(urlToken || "");
  // }
  // , []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No token found"}
      </h2>

      {verified && (
        <div>
          
          <h2 className="p-2 bg-green-500 text-black">Email verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="p-2 bg-red-500 text-black">Email verification failed</h2>
        </div>
      )}
    </div>
  );
}
