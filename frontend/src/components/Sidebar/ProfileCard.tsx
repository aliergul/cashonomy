import React from "react";
import { useAppSelector } from "../../store";
import ProfilePhoto from "./ProfilePhoto";

const ProfileCard: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col h-32 justify-center items-center p-4 bg-gray-700 dark:bg-gray-600 rounded-xl text-sm gap-y-1">
      <ProfilePhoto />
      <span>{user.username}</span>
      <span>{user.email}</span>
    </div>
  );
};

export default ProfileCard;
