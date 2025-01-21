import React, { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import i18next from "i18next";
import { getLang } from "../i18n/config";

const LanguageSelect: React.FC = () => {
  const [lang, setLang] = useState(getLang());

  const handleLanguage = (lng: string) => {
    setLang(lng);
    localStorage.setItem("lang", lng);
    i18next.changeLanguage(lng);
  };

  return (
    <div
      className="
        flex
        items-center 
        justify-center 
        fixed 
        top-4
        right-16 
        rounded-lg 
        border-2 
        cursor-pointer
        hover:bg-opacity-90
        text-light_text_primary
        border-light_border
        bg-light_bg
        dark:text-dark_text_primary
        dark:border-dark_border 
        dark:bg-dark_bg 
        dark:hover:bg-opacity-5
        "
    >
      <Listbox value={lang} onChange={handleLanguage}>
        <div className="relative">
          <ListboxButton
            style={{ textTransform: "uppercase" }}
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
            transition
            "
          >
            <span className="flex items-center justify-center w-[1.125rem] h-[1.125rem]">
              {lang}
            </span>
          </ListboxButton>
          <ListboxOptions
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
                    "
          >
            <ListboxOption
              value="tr"
              className={({ active, selected }) =>
                `cursor-pointer px-4 py-2 ${
                  active ? "bg-blue-100 dark:bg-gray-700" : ""
                } ${
                  selected ? "font-bold text-blue-600 dark:text-blue-400" : ""
                }`
              }
            >
              TR
            </ListboxOption>

            <ListboxOption
              value="en"
              className={({ active, selected }) =>
                `cursor-pointer px-4 py-2 ${
                  active ? "bg-blue-100 dark:bg-gray-700" : ""
                } ${
                  selected ? "font-bold text-blue-600 dark:text-blue-400" : ""
                }`
              }
            >
              EN
            </ListboxOption>
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default LanguageSelect;
