import React, { useEffect, useState } from "react";
import { useColorScheme } from "../utils/useColorScheme";
import DarkTheme from "../assets/icons/DarkTheme";
import LightTheme from "../assets/icons/LightTheme";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../store";
import { setTheme } from "../store/authSlice";

const ColorModeSelect: React.FC = () => {
  const { t } = useTranslation();
  const systemTheme = useColorScheme();
  const dispatch = useAppDispatch();
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || systemTheme
  );

  const toggleTheme = (mode: string) => {
    setThemeMode(mode);
    dispatch(setTheme(mode));
    if (mode === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.removeItem("theme");
    }
  };

  useEffect(() => {
    console.log("themeMode", themeMode);
    if (
      themeMode === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      dispatch(setTheme("dark"));
    } else {
      document.documentElement.classList.remove("dark");
      dispatch(setTheme("light"));
    }
  }, [themeMode]); //eslint-disable-line

  return (
    <div
      className="
        flex
        items-center 
        justify-center 
        rounded-lg 
        border-2 
        cursor-pointer 
        hover:bg-opacity-90
        border-light_border
        bg-light_bg
        dark:border-dark_border 
        dark:bg-dark_bg 
        dark:hover:bg-opacity-5
      "
    >
      <Listbox value={themeMode} onChange={toggleTheme}>
        <div className="relative">
          {/* Button */}
          <ListboxButton
            className="
              flex
              items-center
              justify-center
              rounded-md
              bg-light_bg
              text-light_primary
              dark:bg-dark_bg
              dark:text-dark_primary
              hover:bg-gray-200
              dark:hover:bg-gray-700
              px-2 py-1
              
            "
          >
            {themeMode === "dark" ? <DarkTheme /> : <LightTheme />}
          </ListboxButton>

          {/* Options */}
          <ListboxOptions
            transition
            className="
              absolute
              right-0
              mt-2
              w-36
              border
              rounded-lg
              shadow-lg
              bg-light_bg
              text-light_text_primary
              border-light_border
              dark:bg-dark_bg
              dark:border-dark_border
              dark:text-dark_text_primary
              overflow-hidden
              origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0
            "
          >
            {/* Dark Option */}
            <ListboxOption
              value="dark"
              className={({ active, selected }) =>
                `cursor-pointer px-4 py-2 ${
                  active ? "bg-blue-100 dark:bg-gray-700" : ""
                } ${
                  selected ? "font-bold text-blue-600 dark:text-blue-400" : ""
                }`
              }
            >
              {t("theme:dark")}
            </ListboxOption>

            {/* Light Option */}
            <ListboxOption
              value="light"
              className={({ active, selected }) =>
                `cursor-pointer px-4 py-2 ${
                  active ? "bg-blue-100 dark:bg-gray-700" : ""
                } ${
                  selected ? "font-bold text-blue-600 dark:text-blue-400" : ""
                }`
              }
            >
              {t("theme:light")}
            </ListboxOption>
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default ColorModeSelect;
