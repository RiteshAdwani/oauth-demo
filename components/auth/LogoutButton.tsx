"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Delete user data from local storage and redirect user to home page 
    localStorage.removeItem("userDataWithToken");
    router.push("/");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
