import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Description from "./Description";

const WelcomePage: React.FC = () => {
  const [authType, setAuthType] = React.useState<string>("login");

  const handleAuthType = (type: string) => {
    setAuthType(type);
  };

  return (
    <div className="flex flex-col gap-y-20 p-5">
      <div className="flex justify-center space-x-8">
        <Description />
        <div className="w-1/4 flex items-center justify-center bg-light_bg dark:bg-dark_bg shadow rounded border border-light_border dark:border-dark_border">
          {authType === "login" ? (
            <LoginForm handleAuthType={handleAuthType} />
          ) : (
            <SignUpForm handleAuthType={handleAuthType} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
