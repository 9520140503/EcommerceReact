/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes:{
        snake:{
           '0%': { backgroundPosition: '0% 50%' },
           '100%': { backgroundPosition: '200% 50%' },
        }
      },
      animation:{
        snake:'snake 3s linear infinite'
      }
    },
  },
  plugins: [],
}

