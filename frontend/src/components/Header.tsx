import React from "react";
import LanguageSelect from "./LanguageSelect";
import ColorModeSelect from "./ColorModeSelect";

const Header: React.FC = () => {
  return (
    <div className="absolute top-4 right-4 flex gap-4">
      <LanguageSelect />
      <ColorModeSelect />
    </div>
  );
};

export default Header;
