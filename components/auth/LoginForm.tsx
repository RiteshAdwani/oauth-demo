import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoginButton from "@/components/auth/LoginButton";

const LoginForm = () => {
  return (
    <Card className="w-[400px] shadow-md flex flex-col items-center">
      <CardHeader className="text-3xl font-semibold">OAuth Demo</CardHeader>
      <CardContent className="flex flex-col space-y-3">
        <LoginButton provider="google" />
        <LoginButton provider="github" />
      </CardContent>
    </Card>
  );
};

export default LoginForm;
