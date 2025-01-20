import React from "react";
import LoginForm from "../../components/Form/LoginForm";
import SignUpForm from "../../components/Form/SignUpForm";
import AuthContainer from "./AuthContainer";
import Description from "./Description";

const WelcomePage: React.FC = () => {
  const [authType, setAuthType] = React.useState<string>("login");

  const handleAuthType = (type: string) => {
    setAuthType(type);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900">
      <div className="absolute left-0 top-0 h-full w-8/12 bg-gradient-to-br from-slate-800 via-indigo-800 to-slate-700"></div>
      <div className="absolute right-0 top-0 h-full w-4/12 bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen text-white">
        <div className="relative z-10 flex items-center justify-center space-y-8">
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
