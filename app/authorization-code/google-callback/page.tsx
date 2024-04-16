import UserData from "@/components/shared/UserData";

interface SearchParamsProps {
  searchParams: {
    code: string;
  };
}

const GoogleAuthCallback = async ({ searchParams }: SearchParamsProps) => {
  const { code } = searchParams;

  // Send the authorization code to the server to complete the authentication process
  const response = await fetch(`http://localhost:3000/api/authorization-code/google`, {
    body: JSON.stringify({ code }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const user = await response.json();
    return <UserData userDataWithToken={user.userDataWithToken} />;
  }
  return <div className="text-3xl">Login Failed!</div>;
};

export default GoogleAuthCallback;
