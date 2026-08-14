/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: {
          50: "#FBF8F1",
          100: "#F5F1E8",
          200: "#EDE5D3",
          300: "#E0D3B8",
        },
        ink: {
          900: "#211B14",
          800: "#2C2419",
          700: "#3B3222",
        },
        seal: {
          500: "#B23B2E",
          600: "#9A3126",
        },
        gold: {
          400: "#C9A24B",
          500: "#B5893A",
          600: "#96702C",
        },
      },
      fontFamily: {
        serif: ["'Noto Serif TC'", "'Noto Serif'", "ui-serif", "Georgia", "serif"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        coinFlip: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(1080deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.55 },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease forwards",
        coinFlip: "coinFlip 0.7s cubic-bezier(0.4, 0.0, 0.2, 1)",
        shimmer: "shimmer 2.5s linear infinite",
        pulseSoft: "pulseSoft 1.4s ease-in-out infinite",
      },
      boxShadow: {
        card: "0 1px 2px rgba(33,27,20,0.04), 0 8px 24px -8px rgba(33,27,20,0.12)",
        cardHover: "0 2px 4px rgba(33,27,20,0.06), 0 16px 32px -12px rgba(33,27,20,0.18)",
      },
    },
  },
  plugins: [],
};
