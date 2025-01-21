import React from "react";

interface AuthFormFieldProps {
  label: string;
  inputName: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthFormField: React.FC<AuthFormFieldProps> = ({
  label,
  inputName,
  placeholder,
  type = "text",
  value,
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
        type={type}
        name={inputName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="p-2 rounded border-2 border-light_border dark:border-dark_border bg-white dark:bg-black text-light_text_primary dark:text-dark_text_primary"
      />
    </div>
  );
};

export default AuthFormField;
