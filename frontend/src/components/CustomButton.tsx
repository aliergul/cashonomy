import React from "react";
import { Button } from "@mui/material";

interface CustomButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  customStyle?: string;
  icon?: JSX.Element;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  type = "button",
  customStyle,
  icon,
  loading = false,
}) => {
  return (
    <>
      <Button
        type={type}
        loading={loading}
        variant="contained"
        className={`${customStyle && customStyle}`}
      >
        {icon && icon}
        {title}
      </Button>
    </>
  );
};

export default CustomButton;
