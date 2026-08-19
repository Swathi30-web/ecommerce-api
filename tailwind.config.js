/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#161A2B',
          50: '#F4F5F8',
          100: '#E6E8F0',
          200: '#C7CBDC',
          300: '#9AA0BE',
          400: '#6A7099',
          500: '#454B73',
          600: '#2E3358',
          700: '#20233F',
          800: '#181B30',
          900: '#161A2B',
        },
        amber: {
          DEFAULT: '#F2A93B',
          50: '#FEF6E9',
          100: '#FCE8C4',
          200: '#F9D48A',
          300: '#F5C05B',
          400: '#F2A93B',
          500: '#E28E1C',
          600: '#BC7113',
          700: '#8F5610',
        },
        paper: '#FAF9F6',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(22,26,43,0.06), 0 4px 16px rgba(22,26,43,0.06)',
        cardHover: '0 8px 24px rgba(22,26,43,0.12)',
      },
    },
  },
  plugins: [],
}
