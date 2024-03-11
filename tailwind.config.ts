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
        futurapt: ['Futura PT', 'sans-serif'],
      },
      boxShadow: {
        'top': '0 -25px 20px -15px rgba(0, 0, 0,)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
export default config
