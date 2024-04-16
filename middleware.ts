import { NextRequest, NextResponse } from "next/server";

// Function to extract access token from request headers
const extractAccessToken = (req: NextRequest) => {
  const tokenHeader = req.headers.get("authorization");
  return tokenHeader ? tokenHeader.split(" ")[1] : null;
};

export default async function authenticate(req: NextRequest) {
  const accessToken = extractAccessToken(req);
  if (!accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return null;
}

// Function to verify if access token was granted by GitHub
const verifyGitHubAccessToken = async (accessToken: string) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  try {
    // Verify access token by sending it to GitHub's token info API endpoint
    const response = await fetch(`https://api.github.com/applications/${clientId}/token`, {
      method:"POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        access_token: accessToken
      })
    });

    console.log("Response:::",response)
    // Check if response indicates successful verification
    if (response.ok) {
      return { status: 200, message: "Success" };
    } else {
      // Access token is invalid or verification failed
      return { status: 401, message: "Unauthorized Access!" };
    }
  } catch (error) {
    console.error('Error verifying GitHub access token:', error);
    return { status: 500, message: "Error verifying access token" };
  }
};

// Function to verify if access token was granted by Google
const verifyGoogleAccessToken = async (accessToken: string) => {
  try {
    // Verify access token by sending it to Google's token verification endpoint
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
    const data = await response.json();

    // Check if token is valid
    if (response.ok) {
      // Check if the audience matches the expected Google Client ID
      if (!data.aud || data.aud !== process.env.GOOGLE_CLIENT_ID) {
        // Access token does not match expected audience or other verification checks failed
        return { status: 401, message: "Unauthorized Access!" };
      } else {
        // Access token is valid
        return { status: 200, message: "Success" };
      }
    } else {
      // Access token is invalid
      console.log("Invalid token:", data);
      return { status: 401, message: "Unauthorized Access!" };
    }
  } catch (error) {
    console.error('Error verifying access token:', error);
    return { status: 500, message: "Error verifying access token" };
  }
};

// Main verification function based on endpoint
export const verifyAccessToken = async (req: NextRequest): Promise<{ status: number; message: string }> => {
  const accessToken = extractAccessToken(req);
  if (!accessToken) {
    return { status: 401, message: "Unauthorized Access!" };
  }

  // Check if the access token was granted by Google
  const isGoogleAccessToken = await verifyGoogleAccessToken(accessToken);

  if (isGoogleAccessToken.status === 200) {
    return isGoogleAccessToken;
  }

  // If the access token was not granted by Google, check GitHub
  const isGitHubAccessToken = await verifyGitHubAccessToken(accessToken);
  return isGitHubAccessToken;
};

// // Function to verify if access token was granted by google
// export const verifyAccessToken = async (req: NextRequest) => {
//   const accessToken = extractAccessToken(req);

//   try {
    
//     // Verify access token by sending it to Google's token verification endpoint
//     const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
//     const data = await response.json();

//     // Check if token is valid
//     if (response.ok) {
//       // Perform additional checks to verify if the token was granted by Google
//       if (!data.aud || data.aud !== process.env.GOOGLE_CLIENT_ID) {
//         // Access token does not match expected audience or other verification checks failed
//         return { status: 401, message: "Unauthorized Access!" };
//       } else {
//         // Access token is valid
//         return { status: 200, message: "Success" };
//       }
//     } else {
//       // Access token is invalid
//       console.log("Invalid token:", data);
//       return { status: 401, message: "Unauthorized Access!" };
//     }
//   } catch (error) {
//     console.error('Error verifying access token:', error);
//     return { status: 500, message: "Error verifying access token" };
//   }
// };


export const config = {
  // matcher:["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"]
  matcher: ["/api/members"],
};
