import { Alert } from "@mui/material";
import React from "react";

interface CustomSuccessMessageProps {
  message: any;
}

const CustomSuccessMessage: React.FC<CustomSuccessMessageProps> = ({
  message,
}) => {
  if (!message) {
    return null;
  }
  return <Alert severity="success">{message}</Alert>;
};

export default CustomSuccessMessage;
