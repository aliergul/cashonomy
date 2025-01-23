import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EyeOff from "../../assets/icons/EyeOff";
import Eye from "../../assets/icons/Eye";

interface AuthFormPasswordFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
}

const AuthFormPasswordField: React.FC<AuthFormPasswordFieldProps> = ({
  value = "",
  onChange,
  title = "",
}) => {
  const { t } = useTranslation();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<EyeOff />);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(<Eye />);
      setType("text");
    } else {
      setIcon(<EyeOff />);
      setType("password");
    }
  };

  return (
    <div className="flex flex-col my-2">
      <label
        htmlFor="password"
        className="my-2 text-light_text_primary dark:text-dark_text_secondary"
      >
        {title ? title : t("welcome_page:password")}
      </label>
      <div className="relative">
        <input
          required
          type={type}
          name="password"
          placeholder="******"
          value={value.trim()}
          onChange={onChange}
          className="p-2 transition-all rounded border w-full
        border-light_border 
        hover:border-light_text_primary
        focus:border-light_text_primary
        bg-white 
        text-light_text_primary 
        dark:bg-black 
        dark:border-dark_border 
        dark:hover:border-light_border  
        dark:focus:border-light_border
        dark:text-dark_text_primary"
        />
        <span
          className="absolute top-1/2 right-3 transform -translate-y-1/2 w-[1.125rem] h-[1.125rem] cursor-pointer"
          onClick={handleToggle}
        >
          {icon}
        </span>
      </div>
    </div>
  );
};

export default AuthFormPasswordField;
