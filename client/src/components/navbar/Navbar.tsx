import React, { useEffect, useState } from "react";
import {
  Navbar,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,

} from "@material-tailwind/react";
import {
 
  ChevronDownIcon,
  PowerIcon,

} from "@heroicons/react/24/outline";
import { LocalStorageKeys } from "../../constants";
import { AuthResponse } from "../../interfaces";
import { getLocalStorage } from "../../utils";
import { signOut } from "../../services/auth.service";
 
// profile menu component
const profileMenuItems = [
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [avatar, setAvatar] = useState<string>("");
  useEffect(() => {
    const data = getLocalStorage<AuthResponse>(LocalStorageKeys.DATA);
    // console.log(data?.user.avatar);
    if (data?.user.avatar) {
      const avatar = data.user.avatar;
      setAvatar(avatar);
    }
  }, []);
  const handleLogout = () => {
    signOut();
  };
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={avatar}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={handleLogout}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <span className="text-sm">{label}</span>

            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
 
export function ComplexNavbar() {

 
  return (
    <Navbar shadow={false} className="mx-auto max-w-screen-xl p-3 lg:rounded-md lg:pl-6 border border-gray-200 shadow-sm">
      <div className="relative mx-auto flex justify-between items-center text-blue-gray-900">
       <h1 className=" font-medium text-gray-700">DoLister</h1>
        <ProfileMenu />
      </div>
    </Navbar>
  );
}