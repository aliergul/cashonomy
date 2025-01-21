import React from "react";

interface AuthFormTypeProps {
  title: string;
  link: string;
  onClick: (authType: any) => void;
}

const AuthFormType: React.FC<AuthFormTypeProps> = ({
  title,
  link,
  onClick,
}) => {
  return (
    <div className="my-2 flex text-sm w-full items-center justify-end gap-x-2 text-light_text_primary dark:text-dark_text_primary">
      {title}
      <span
        className="text-indigo-600 cursor-pointer underline opacity-70 hover:opacity-100 transition-all"
        onClick={onClick}
      >
        {link}
      </span>
    </div>
  );
};

export default AuthFormType;
