import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface CustomButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  customStyle?: string;
  icon?: JSX.Element;
  loading?: boolean;
  isDisabled?: boolean;
  customOnClick?: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  type = "button",
  customStyle = "",
  icon,
  loading = false,
  isDisabled = false,
  customOnClick,
}) => {
  return (
    <>
      <Button
        type={type}
        variant="contained"
        disabled={isDisabled}
        onClick={customOnClick && customOnClick}
        className={`${
          isDisabled
            ? "opacity-70 cursor-not-allowed bg-gray-400 dark:bg-gray-600 text-gray-200"
            : customStyle
        }`}
      >
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <>
            {icon && icon}
            {title}
          </>
        )}
      </Button>
    </>
  );
};

export default CustomButton;
