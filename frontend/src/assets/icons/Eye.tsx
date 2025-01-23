import React from "react";
import { FiEye } from "react-icons/fi";
import { useAppSelector } from "../../store";

const Eye: React.FC = () => {
  const theme = useAppSelector((state) => state.auth.theme);
  return <FiEye color={`${theme === "dark" ? "#ffffff" : "#000000"}`} />;
};

export default Eye;
