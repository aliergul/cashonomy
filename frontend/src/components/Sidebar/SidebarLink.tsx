import React from "react";
import { Link } from "../../types/Link";
import { NavLink } from "react-router-dom";
import CustomButton from "../CustomButton";

interface SidebarLinkProps {
  links: Link[];
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ links }) => {
  return (
    <div className="flex flex-col gap-y-5">
      {links.map((item) => (
        <NavLink to={item.to} className="p-2 flex justify-center items-center">
          <CustomButton
            title={item.text}
            customStyle="w-full p-3 text-white bg-ligt_bg_2 dark:bg-dark_bg_3 rounded-lg shadow-md hover:bg-ligt_hover dark:hover:bg-dark_hover transition-all hover:scale-105"
          />
        </NavLink>
      ))}
    </div>
  );
};

export default SidebarLink;
