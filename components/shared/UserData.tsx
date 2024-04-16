"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/shared/Loader";

// Interface for GitHub user data
interface GitHubUserData {
  login?: string;
  avatar_url?: string;
  bio?: string;
  accessToken:string;
}

// Interface for Google user data
interface GoogleUserData {
  name?: string;
  email?: string;
  picture?: string;
  accessToken:string;
}

// Union type for both Google and GitHub user data
type UserData = GitHubUserData | GoogleUserData;

const UserData = ({ userDataWithToken }: { userDataWithToken: UserData }) => {
  useEffect(() => {
    if (userDataWithToken) {
      // Store user data in localStorage
      localStorage.setItem("userDataWithToken", JSON.stringify(userDataWithToken));
      redirect("/dashboard");
    }
  }, [userDataWithToken]);
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default UserData;
