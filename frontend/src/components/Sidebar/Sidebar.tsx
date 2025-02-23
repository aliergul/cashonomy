import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store";
import { postLogout } from "../../store/authSlice";
import { Link } from "../../types/Link";
import SidebarLink from "./SidebarLink";
import ProfileCard from "./ProfileCard";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const links: Link[] = [
    {
      id: "dashboard",
      to: "/dashboard",
      text: t("sidebar:dashboard"),
      //icon: <Home />,
    },
    {
      id: "incomes",
      to: "/incomes",
      text: t("sidebar:incomes"),
      //icon: <Home />,
    },
    {
      id: "outcomes",
      to: "/outcomes",
      text: t("sidebar:outcomes"),
      //icon: <Home />,
    },
    {
      id: "tags",
      to: "/tags",
      text: t("sidebar:tags"),
      //icon: <Home />,
    },
  ];

  const logout = () => {
    setLoading(true);
    const timeout = setTimeout(() => {
      dispatch(postLogout());
    }, 1000);
    return () => {
      setLoading(false);
      clearTimeout(timeout);
    };
  };
  return (
    <div className="min-h-screen w-64 bg-gray-900 dark:bg-gray-800 text-white flex flex-col p-6 gap-6 shadow-lg">
      <ProfileCard />
      <SidebarLink links={links} />
      <div className="flex flex-grow"></div>
      <CustomButton
        title={t("dashboard:logout")}
        customOnClick={logout}
        loading={loading}
        customStyle="p-3 text-white bg-gray-800 dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-all hover:scale-105"
      />
    </div>
  );
};

export default Sidebar;
