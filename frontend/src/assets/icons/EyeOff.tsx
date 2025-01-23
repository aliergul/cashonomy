import React from "react";
import { FiEyeOff } from "react-icons/fi";
import { useAppSelector } from "../../store";

const EyeOff: React.FC = () => {
  const theme = useAppSelector((state) => state.auth.theme);
  return <FiEyeOff color={`${theme === "dark" ? "#ffffff" : "#000000"}`} />;
};

export default EyeOff;
