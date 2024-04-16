"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader } from "@/components/ui/card";

interface UserData {
  login?: string;
  name?: string;
  bio?: string;
  email?: string;
  avatar_url?: string;
  picture?: string;
}

const UserDisplayInfo = () => {
  // Initialize userData with its type for better type checking
  const [userData, setUserData] = useState<UserData>({});
  const [loading,setLoading] = useState(true);
  
  useEffect(() => {
    const storedUserData = localStorage.getItem("userDataWithToken");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setLoading(false)
    }
  }, []);

  if(loading){
    return <h1 className='text-white'>Loading...</h1>
  }
  if (!userData || Object.keys(userData).length === 0) {
    return <div>Please login</div>;
  }

  return (
    <Card className="flex flex-col items-center justify-center space-y-3 px-2 py-3 w-[400px]">
      <CardHeader className="text-3xl flex flex-col justify-center">
        <h1 className="mx-auto">Welcome</h1>
        <h1>
          {userData.login || userData.name}!
        </h1>
      </CardHeader>

      {userData.bio && <p>Bio: {userData.bio}</p>}
      {userData.email && <p>Email: {userData.email}</p>}
      <img
        src={userData.avatar_url || userData.picture}
        alt="User Avatar"
        className="w-[80px] h-[80px] rounded-full"
      />
    </Card>
  );
};

export default UserDisplayInfo;
