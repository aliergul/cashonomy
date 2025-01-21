/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark_text_primary: "#ffffff",
        dark_text_secondary: "#94a0b8",
        dark_border: "#202632",
        dark_bg: "#14181b",
        icon: "#69b6fa",
        light_text_primary: "#0b0e14",
        light_text_secondary: "#8791a5",
        light_border: "#e4e7ed",
        light_bg: "#fcfdff",
        focus: "#81b5e9",
      },
      backgroundImage: {
        "dark-gradient": `radial-gradient(circle, hsla(212, 87%, 9%, 1) 0%, hsla(218, 41%, 5%, 1) 91%)`,
        "light-gradient": `radial-gradient(circle, hsla(210, 88%, 97%, 1) 0%, hsla(180, 100%, 100%, 1) 91%)`,
      },
    },
  },
  plugins: [],
};
