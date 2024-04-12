"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/shared/Loader";

// Interface for GitHub user data
interface GitHubUserData {
  login?: string;
  avatar_url?: string;
  bio?: string;
}

// Interface for Google user data
interface GoogleUserData {
  name?: string;
  email?: string;
  picture?: string;
}

// Union type for both Google and GitHub user data
type UserData = GitHubUserData | GoogleUserData;

const UserData = ({ userData }: { userData: UserData }) => {
  useEffect(() => {
    if (userData) {
      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      redirect("/dashboard");
    }
  }, [userData]);
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default UserData;
