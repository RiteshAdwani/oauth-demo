
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const MembersPage = () => {
  const [accessToken, setAccessToken] = useState("");
  const [error,setError] = useState(null);
  const router = useRouter();
  const [isPending,startTransition] = useTransition();

  useEffect(() => {
    const userDataWithToken = JSON.parse(localStorage.getItem("userDataWithToken") || "{}");
    if(Object.keys(userDataWithToken).length === 0) router.push("/");

    if (userDataWithToken.accessToken) {
      // const duplicateAccessToken = accessToken.concat("duplicate")
      // setAccessToken(duplicateAccessToken);
      setAccessToken(userDataWithToken.accessToken);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          startTransition(async()=>{
            const response = await fetch("http://localhost:3000/api/members", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
              }
            });
           if(!response.ok){
            // localStorage.removeItem("userDataWithToken");
            router.push("/dashboard");
           }
          })
        } catch (error:any) {
          setError(error)
          console.error('Failed to fetch members data:', error);
          localStorage.removeItem("userDataWithToken")
          router.push("/")
        }
      };
      fetchData();
    }
  }, [accessToken]);

  if(isPending){
    return <h1 className="text-white">Loading...</h1>
  }

  return (
    accessToken !== "" && !error &&
    <div className="text-white h-screen flex justify-center items-center">
      This page can only be accessed by users having a Membership!
    </div>
  );
}

export default MembersPage;

