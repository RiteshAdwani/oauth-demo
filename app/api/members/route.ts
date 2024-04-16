import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/middleware";

export const GET = async (req: NextRequest) => {
  // Verify the access token
  const verificationResult = await verifyAccessToken(req);
  
  // Check if the verification result indicates unauthorized access
  if (verificationResult.status === 401) {
    // If unauthorized, return the verification result directly
    return verificationResult;
  } else if (verificationResult.status === 500) {
    // If there was an error during token verification, handle it
    console.error("Error verifying access token");
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } else {
    // If authorized, return success message
    console.log("Authorized User!")
    return NextResponse.json({ message: "Congrats! You are authorized to access this resource" });
  }
};
