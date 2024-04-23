// This is an example of how to read a JSON Web Token from an API route
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

type ResponseData = any;

export const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) {
    // Signed in
    return NextResponse.json(token, { status: 200 });
  } else {
    // Not Signed in
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
};
