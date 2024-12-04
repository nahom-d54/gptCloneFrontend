/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      extend: {
        typography: {
          DEFAULT: {
            css: {
              pre: {
                padding: "0",
                margin: "0",
                backgroundColor: "transparent",
              },
              code: {
                backgroundColor: "transparent",
                padding: "0",
                fontWeight: "400",
              },
              "code::before": {
                content: '""',
              },
              "code::after": {
                content: '""',
              },
            },
          },
        },
      },
    },
  },
  plugins: [import("@tailwindcss/typography")],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
};
