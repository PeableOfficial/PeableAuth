import { createHash } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import {
  NextRequest,
  NextResponse,
  userAgent as nextUserAgent,
} from "next/server";

type ResponseData = any;

export async function GET(
  req: NextRequest,
  res: NextApiResponse<ResponseData>
) {
  const url = req.nextUrl;
  const { device } = nextUserAgent(req);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  // Get the client's IP address and user agent
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"];

  // Generate a unique clientKey based on the IP address and user agent
  const clientKey = createHash("sha256")
    .update(ip + userAgent)
    .digest("hex");

  if (clientKey) {
    // Signed in
    return NextResponse.json(clientKey, { status: 200 });
  } else {
    // Not Signed in
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
}
