/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    themes: ["light", "dark"],

    extend: {
      colors: {
        primary: '#213555', 
        secondary: '#4F709C', 
        accent: '#E5D283',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],

}
