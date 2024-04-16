import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface LoginButtonProps {
  provider: "google" | "github";
}

const LoginButton = ({ provider }: LoginButtonProps) => {
  // Determine the OAuth client ID and redirect URI based on the provider
  const clientId =
    provider === "google"
      ? process.env.GOOGLE_CLIENT_ID
      : process.env.GITHUB_CLIENT_ID;
  const redirectUri = `http://localhost:3000/authorization-code/${provider}-callback`;
  const scope = encodeURIComponent(
    provider === "google" ? "email profile openid" : "user"
  );
  const prompt = "select_account";
  const responseType = "code";

  // Construct the OAuth URL based on the provider
  const oauthUrl =
    provider === "google"
      ? `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&prompt=${prompt}`
      : `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  return (
    <Button size="lg" className="flex items-center py-2">
      {provider === "google" ? <FcGoogle size="2em" /> : <FaGithub size="2em" />}
      <Link href={oauthUrl} className="ms-3 text-lg">
        Login with {provider}
      </Link>
    </Button>
  );
};

export default LoginButton;
