/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7E5DF6",
          dark: "#5D67BC",
          light: "rgba(126, 93, 246, 0.47)",
        },
        border: "#E1E3E4",
        muted: "#6B7280",
        grayText: "#9CA3AF",
        darkText: "#1F2937",
        background: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
