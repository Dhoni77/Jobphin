/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'card-color': "#ffffff",
        'card-border': '#e6e6e6',
        'job-dark': '#212121',
        'job-white': '#fafafa',
        'job-error': '#d86161',
        'job-placeholder': '#7a7a7a',
      }
    },
  },
  plugins: [],
}

