import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Description from "./Description";
import ColorModeSelect from "../../components/ColorModeSelect";
import LanguageSelect from "../../components/LanguageSelect";

const WelcomePage: React.FC = () => {
  const [authType, setAuthType] = React.useState<string>("login");

  const handleAuthType = (type: string) => {
    setAuthType(type);
  };

  return (
    <div className="">
      <LanguageSelect />
      <ColorModeSelect />
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center space-y-8">
          <Description />
          <div className="w-1/4 flex items-center justify-center  p-6 bg-light_bg dark:bg-dark_bg shadow rounded border border-light_border dark:border-dark_border">
            {authType === "login" ? (
              <LoginForm handleAuthType={handleAuthType} />
            ) : (
              <SignUpForm handleAuthType={handleAuthType} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
