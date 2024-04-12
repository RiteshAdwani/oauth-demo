import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  // Extract the authorization code from the request body
  const { code } = await req.json();
  console.log("Code:", code);

  // Retrieve OAuth client ID, client secret, and redirect URI from environment variables
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = "http://localhost:3000/google-callback";

  try {
    // Exchange the authorization code for an access token from Google OAuth server
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    // If the token exchange fails, throw an error
    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for token");
    }

    // Parse the token data from the response
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    console.log("Access Token: ", accessToken);

    // Fetch user data from Google using the access token
    const userDataResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // If fetching user data fails, throw an error
    if (!userDataResponse.ok) {
      throw new Error("Failed to fetch user data from Google");
    }

    // Parse user data from the response
    const userData = await userDataResponse.json();
    console.log("User Data:", userData);

    // Return the user data in the response
    return NextResponse.json({ userData });
  } catch (error) {
    console.error("Authentication error:", error);
    redirect("/");
  }
};
