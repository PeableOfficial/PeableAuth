// This is an example of how to read a JSON Web Token from an API route
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

type ResponseData = any;
export async function GET(request: Request) {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({
    req: request,
    secret:
      "5ddf43636af10bb58ae3b1e2f21d4b909bb5b613e91b1b4a891ba3342c95b266f5bbf18b6751a79ec13111ce15a63bbc3a33f1c38cd9071f45ac5db2ab81b1bf",
    salt: "",
  });

  if (token) {
    // Signed in
    return NextResponse.json(token, { status: 200 });
  } else {
    // Not Signed in
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
}
