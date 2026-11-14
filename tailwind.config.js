/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#172D29',
          950: '#0B1614',
          900: '#0F1E1B',
          800: '#172D29',
          700: '#22403B',
          600: '#2E554E',
        },
        ivory: {
          DEFAULT: '#F7F5EF',
          50: '#FCFBF8',
          100: '#F7F5EF',
          200: '#EFECE0',
        },
        beige: {
          DEFAULT: '#EAE5D9',
          light: '#F3EFE7',
          dark: '#D9D2C2',
        },
        gold: {
          DEFAULT: '#B69A70',
          light: '#CBB490',
          dark: '#9B8057',
          shimmer: '#D8C29D',
          champagne: '#D6B878',
          regal: '#B38738',
          bronze: '#8C6D37',
        },
        sandstone: {
          DEFAULT: '#FAF6F0',
          50: '#FCFBF8',
          100: '#FAF6F0',
          200: '#F0EAE1',
        },
        parchment: '#FCFBF8',
        sandborder: '#D6C5AD',
        charcoal: {
          DEFAULT: '#252722',
          900: '#171815',
          800: '#252722',
          700: '#3A3D36',
        },
        muted: {
          DEFAULT: '#77776F',
          light: '#9E9E95',
          dark: '#55554E',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        '3d-subtle': '0 10px 30px -10px rgba(23, 45, 41, 0.12)',
        '3d-card': '0 20px 45px -15px rgba(23, 45, 41, 0.18)',
        '3d-hover': '0 30px 60px -12px rgba(23, 45, 41, 0.28)',
        'gold-glow': '0 0 30px rgba(182, 154, 112, 0.25)',
      },
    },
  },
  plugins: [],
}

