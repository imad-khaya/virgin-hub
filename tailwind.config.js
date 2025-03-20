/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  // Tailwind should look in the pages folder
    './components/**/*.{js,ts,jsx,tsx}',  // Tailwind should look in the components folder
    './app/**/*.{js,ts,jsx,tsx}',  // Add this if you are using Next.js app directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
