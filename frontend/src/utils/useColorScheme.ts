import { useEffect, useState } from "react";

export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState("dark");

  useEffect(() => {
    const handleChange = (e: any) => {
      if (e.matches) {
        setColorScheme("dark");
        //localStorage.setItem("theme", "dark");
      } else {
        setColorScheme("light");
        //localStorage.setItem("theme", "light");
      }
    };

    const scheme = matchMedia("(prefers-color-scheme: dark)");
    handleChange(scheme); //for first render
    scheme.addEventListener("change", handleChange);

    return () => {
      scheme.removeEventListener("change", handleChange);
    };
  });

  return colorScheme;
}
