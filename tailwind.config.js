/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        mainColor: "#8B5E35",
        bgfooter: "#2E2E2E",
        secondColro: "#9B7E5C",
        textcolor: "#090F41",
        textcolor2: "#9D9DAA",
        yellow: "#FFC000",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
