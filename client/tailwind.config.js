// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable dark mode if needed
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Specify the files for Tailwind to scan for classes
  ],
  theme: {
    extend: {}, // Extend the default Tailwind theme here if needed
  },
  plugins: [
    require('@tailwindcss/forms'), // Enable Tailwind forms plugin for form styling
  ],
};
