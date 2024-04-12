import LogoutButton from "@/components/auth/LogoutButton";
import UserDisplayInfo from "@/components/shared/UserDisplayInfo";

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <UserDisplayInfo />
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
