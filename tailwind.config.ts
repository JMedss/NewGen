import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        courier: ['Courier Prime', 'monospace'],
      },
      boxShadow: {
        'top': '0 -25px 20px -15px rgba(0, 0, 0,)',
      },
      colors: {
        "white-primary": "#FFFAFA",
        "yellow-primary": "#FEE302",
        "black-primary": "#282828",
        "light-blue": "#43607B",
        "gray": "#9CAFB7",
        "blue": "#124B6A"
      },
      rotate: {
        "135": "135deg",
      },
      backgroundImage: {
        "blue-gradient": "linear-gradient(to bottom, #9CAFB7 0%, #124B6A 100%)",
        "reversed-blue-gradient": "linear-gradient(to top, #9CAFB7 0%, #124B6A 100%)",
        'stroke-gradient': 'linear-gradient(to bottom right, rgba(255, 250, 250, 0.5) 0%, rgba(255, 250, 250, 0.5) 100%)',
        "yellow-gradient": "linear-gradient(to bottom, rgba(254, 227, 2, 1) 0%, rgba(254, 227, 2, 1) 60%, rgba(254, 227, 2, 0.0) 100%)",
        "hover-gradient": "radial-gradient(circle, rgba(254, 227, 2, 0.3) 0%, rgba(67, 96, 123, 1) 60%)",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
export default config
