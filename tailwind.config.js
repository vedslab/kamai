/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Palette Colors:
        // 1. Deep Navy Blue: #1A2D57 (Primary brand, text, dark CTA, active state)
        // 2. Warm Camel / Tan: #D9C0A2 (Warm rich secondary, borders, accents)
        // 3. Pale Cream Sand: #EADBC8 (Linen pill fills, soft containers, dividers)
        // 4. Warm Canvas White: #FFFBF8 / #FAF6F0 (Page background, card surfaces)
        ivory: {
          50: '#FFFBF8',  // Swatch 4: Pure warm white canvas
          100: '#FAF6F0', // Soft warm background
          200: '#F3EDE3',
          300: '#EADBC8', // Swatch 3: Pale cream linen
        },
        navy: {
          50: '#EEF3FA',
          100: '#D8E3F4',
          200: '#B0C5E8',
          300: '#84A4DC',
          400: '#527EC9',
          500: '#2E58A6',
          600: '#244583',
          700: '#203768',
          800: '#1A2D57', // Swatch 1: Deep Royal Navy Blue
          900: '#111E3B', // Midnight navy
          950: '#0A1224',
        },
        // Alias deepgreen to deep navy for complete app-wide seamless harmonization
        deepgreen: {
          50: '#EEF3FA',
          100: '#D8E3F4',
          200: '#B0C5E8',
          600: '#2E58A6',
          700: '#203768',
          800: '#1A2D57', // Swatch 1: Deep Navy Blue
          900: '#111E3B', // Midnight navy
          950: '#0A1224',
        },
        sand: {
          50: '#FDFBF7',
          100: '#F7F2EA',
          200: '#EADBC8', // Swatch 3: Pale cream sand / linen
          300: '#D9C0A2', // Swatch 2: Warm Camel / Sand Tan
          400: '#C9AD8A',
          500: '#B7956E',
          600: '#9B7A53',
          700: '#7F613E',
        },
        camel: {
          100: '#F7F2EA',
          200: '#EADBC8', // Swatch 3
          300: '#E2CFB7',
          400: '#D9C0A2', // Swatch 2
          500: '#C9AD8A',
          600: '#A98963',
          700: '#846743',
        },
        terracotta: {
          50: '#FBF0EC',
          100: '#F5DACF',
          500: '#D9C0A2', // Accent camel-tan
          600: '#C14B23', // Red stamp mark
          700: '#A43A16',
        },
        nearblack: {
          DEFAULT: '#121E36', // Navy-charcoal high contrast text
          muted: '#273859',   // Navy muted text
          subtle: '#4B5C7D',  // Slate navy subtle text
          light: '#7585A4',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-xs': '0 1px 2px rgba(26, 45, 87, 0.05)',
        'warm-sm': '0 1px 3px rgba(26, 45, 87, 0.06), 0 1px 2px rgba(26, 45, 87, 0.04)',
        'warm': '0 2px 5px rgba(26, 45, 87, 0.07), 0 1px 2px rgba(26, 45, 87, 0.04)',
        'warm-md': '0 4px 10px rgba(26, 45, 87, 0.09), 0 2px 4px rgba(26, 45, 87, 0.05)',
        'warm-lg': '0 10px 20px rgba(26, 45, 87, 0.12), 0 4px 8px rgba(26, 45, 87, 0.06)',
        'warm-xl': '0 16px 32px rgba(26, 45, 87, 0.15), 0 6px 12px rgba(26, 45, 87, 0.08)',
      }
    },
  },
  plugins: [],
}
