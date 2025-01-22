import React from "react";

interface AuthFormInputFieldProps {
  label: string;
  inputName: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthFormInputField: React.FC<AuthFormInputFieldProps> = ({
  label,
  inputName,
  placeholder,
  type = "text",
  value = "",
  onChange,
}) => {
  return (
    <div className="flex flex-col my-2">
      <label
        htmlFor={inputName}
        className="my-2 text-light_text_primary dark:text-dark_text_secondary"
      >
        {label}
      </label>
      <input
        required
        type={type}
        name={inputName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="p-2 transition-all rounded border
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
    </div>
  );
};

export default AuthFormInputField;
