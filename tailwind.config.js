/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // This path is for files directly in the app directory, like your page.js and layout.js
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // This path is for all your components inside the components folder
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // You can add custom theme values here later if you want
    },
  },
  plugins: [],
};