/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        food: "url('/src/assets/food-bg.png')",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#D74339",
        footer: "#373334",
        form: " #D9D9D9",
        white: " #F3F2F0",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
