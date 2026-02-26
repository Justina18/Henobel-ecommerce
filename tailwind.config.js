/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
      },
      colors: {
        henobel: {
          dark: '#225609',
          lime: '#7ac803',
          yellow: '#ffc600',
          black: '#040c01',
        },
        surface: {
          container: {
            low: "#FCFCFC",
            medium: "#F5F5F5",
            high: "#EEEEEE",
            highest: "#FFFFFF",
          },
          inverse: {
            surface: "#121212",
            on: "#FFFFFF",
          },
        },
        onSurface: "#1A1A1A",
        onSurfaceVariant: "#5E5E5E",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
      },
      boxShadow: {
        "md3-1": "0 1px 2px rgba(4,12,1,0.06), 0 1px 3px rgba(4,12,1,0.08)",
        "md3-2": "0 4px 10px rgba(4,12,1,0.08), 0 2px 6px rgba(4,12,1,0.06)",
      },
    },
  },
  plugins: [],
};
