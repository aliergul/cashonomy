import React from "react";

interface AuthContainerProps {
  children: React.ReactNode;
}
const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="w-5/12 flex items-center justify-center bg-red-300">
      {children}
    </div>
  );
};

export default AuthContainer;
