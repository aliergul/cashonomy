import { Alert } from "@mui/material";
import React from "react";
import errorMessages from "../utils/errorMessages";

interface ErrorMessageProps {
  error: any;
}

const CustomErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  let errorMessage = error;

  if (!error) {
    return null;
  }
  if (error.data && error.data.errorCode) {
    errorMessage = errorMessages(error);
  }

  return (
    <Alert severity="error" className="my-4">
      {errorMessage}
    </Alert>
  );
};

export default CustomErrorMessage;
