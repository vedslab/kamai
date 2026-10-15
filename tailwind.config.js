/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FAF8F3',
          100: '#F7F3EA', // Core palette ivory
          200: '#EDE5D4',
          300: '#E4D8BF',
        },
        terracotta: {
          50: '#FBF0EC',
          100: '#F5DACF',
          500: '#D65A31', // Core palette terracotta
          600: '#C14B23',
          700: '#A43A16',
        },
        deepgreen: {
          50: '#EBF2EE',
          100: '#D3E2DA',
          700: '#2F4D42',
          800: '#253C34', // Core palette deep green
          900: '#182722',
        },
        sand: {
          100: '#F6EEDD',
          200: '#EEDCBD',
          300: '#E5CFA2', // Core palette sand
          400: '#D8BD83',
          500: '#C9A963',
        },
        nearblack: {
          DEFAULT: '#1F2925', // Core palette near-black (14.5:1 contrast against #F7F3EA)
          muted: '#3D4A44',   // WCAG AAA passed (8.2:1 contrast against #F7F3EA)
          subtle: '#4D5E56',  // WCAG AA passed (5.8:1 contrast against #F7F3EA)
          light: '#657870',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 1px 2px rgba(31, 41, 37, 0.05)',
        'warm': '0 2px 4px rgba(31, 41, 37, 0.06), 0 1px 2px rgba(31, 41, 37, 0.04)',
        'warm-md': '0 4px 8px rgba(31, 41, 37, 0.08), 0 2px 4px rgba(31, 41, 37, 0.04)',
        'warm-lg': '0 8px 16px rgba(31, 41, 37, 0.1), 0 4px 6px rgba(31, 41, 37, 0.05)',
      }
    },
  },
  plugins: [],
}
