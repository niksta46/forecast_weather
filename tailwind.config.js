export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF5FF',
          100: '#D6EBFF',
          200: '#ADD5FF',
          300: '#85BFFF',
          400: '#5CA8FF',
          500: '#338EFF',
          600: '#297ACC',
          700: '#1F5C99',
          800: '#154766',
          900: '#0B3333',
        },
        sunny: '#FCD34D',
        cloudy: '#94A3B8',
        rainy: '#60A5FA',
        stormy: '#6366F1',
        snowy: '#E2E8F0',
        foggy: '#CBD5E1',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
