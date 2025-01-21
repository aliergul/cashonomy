import React from "react";
import LoginForm from "../../components/Form/LoginForm";
import SignUpForm from "../../components/Form/SignUpForm";
import AuthContainer from "./AuthContainer";
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
          <AuthContainer>
            {authType === "login" ? (
              <LoginForm handleAuthType={handleAuthType} />
            ) : (
              <SignUpForm handleAuthType={handleAuthType} />
            )}
          </AuthContainer>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
