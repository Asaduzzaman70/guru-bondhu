/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myColor: {
          light: "#dff9fb",
          default: "#c7ecee",
          dark: "#95afc0"
        },
        myYellow: '#F4BC32',
        myPurple: '#E7586D',
        myText: {
          light: "#f8fafc",
          default: "#64748b",
          dark: "#020617"
        }
      },
      fontFamily: {
        poetsen: ["Poetsen One", "sans-serif"],
        poppins: ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}