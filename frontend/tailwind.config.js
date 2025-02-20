/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  important: true,
  theme: {
    extend: {
      colors: {
        dark_text_primary: "#ffffff",
        dark_text_secondary: "#94a0b8",
        dark_border: "#202632",
        dark_bg: "#040f19",
        dark_bg_2: "#020d1a",
        dark_bg_3: "#374151",
        dark_hover: "#4b5563",
        icon: "#69b6fa",
        light_text_primary: "#0b0e14",
        light_text_secondary: "#8791a5",
        light_border: "#e4e7ed",
        light_bg: "#fcfdff",
        ligt_bg_2: "#1f2937",
        ligt_hover: "#374151",
        focus: "#81b5e9",
        light_grey: "#E2E2E2FF",
      },
      backgroundImage: {
        "dark-gradient": `radial-gradient(circle, hsla(212, 87%, 9%, 1) 0%, hsla(218, 41%, 5%, 1) 91%)`,
        "light-gradient": `radial-gradient(circle, hsla(210, 88%, 97%, 1) 0%, hsla(180, 100%, 100%, 1) 91%)`,
      },
    },
  },
  plugins: [],
};
