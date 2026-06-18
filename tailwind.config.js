/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#effaf2",
          100: "#d9f2df",
          500: "#53b175",
          600: "#3f9a5f",
          700: "#2f7549"
        },
        ink: "#181725",
        muted: "#7c7c7c",
        cream: "#f7f6f2"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(25, 38, 28, 0.10)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
