import React from "react";

interface AuthFormTitleProps {
  title: string;
}

const AuthFormTitle: React.FC<AuthFormTitleProps> = ({ title }) => {
  return (
    <span className="justify-start text-3xl font-semibold text-light_text_primary dark:text-dark_text_primary">
      {title}
    </span>
  );
};

export default AuthFormTitle;
