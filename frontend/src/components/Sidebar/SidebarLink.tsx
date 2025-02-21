import React from "react";
import { Link } from "../../types/Link";
import { NavLink } from "react-router-dom";

interface SidebarLinkProps {
  links: Link[];
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ links }) => {
  return (
    <div className="flex flex-col gap-y-5">
      {links.map((item) => (
        <NavLink
          key={item.id}
          to={item.to}
          className={({ isActive }) =>
            `p-2 flex justify-center items-center transition-all rounded ${
              isActive
                ? "bg-light_bg dark:bg-dark_bg text-light_text_primary  dark:text-dark_text_primary"
                : "hover:bg-light_bg hover:bg-opacity-50"
            }`
          }
        >
          {item.text}
        </NavLink>
      ))}
    </div>
  );
};

export default SidebarLink;
