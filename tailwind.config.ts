import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        background: 'hsla(220, 17%, 7%, 1)',
        'banner-background': 'hsla(250, 6%, 20%, 1)',
      },
      textColor: {
        'white-alpha-20': 'hsla(0, 0%, 100%, 0.2)',
        'on-background': 'hsla(220, 100%, 95%, 1)',
        'on-surface': 'hsla(250, 100%, 95%, 1)',
        'on-surface-variant': 'hsla(250, 1%, 44%, 1)',
        primary: 'hsla(349, 100%, 43%, 1)',
        'primary-variant': 'hsla(349, 69%, 51%, 1)',
        'rating-color': 'hsla(44, 100%, 49%, 1)',
        surface: 'hsla(250, 13%, 11%, 1)',
        'text-color': 'hsla(250, 2%, 59%, 1)',
        white: 'hsla(0, 0%, 100%, 1)',
      },
      gradientColorStops: {
        'banner-overlay': 'hsl(220, 17%, 7%) 0%, hsla(220, 17%, 7%, 0.5) 100%',
        'bottom-overlay': 'hsla(250, 13%, 11%, 0), hsla(250, 13%, 11%, 1)',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        heading: '4rem',
        'title-lg': '2.6rem',
        title: '2rem',
        body: '1.8rem',
        button: '1.5rem',
        label: '1.4rem',
      },
      fontWeight: {
        "bold": "700",
      },
      boxShadow: {
        1: '0 1px 4px hsla(0, 0%, 0%, 0.75)',
        2: '0 2px 4px hsla(350, 100%, 43%, 0.3)',
      },
      borderRadius: {
        4: '4px',
        8: '8px',
        16: '16px',
        24: '24px',
        36: '36px',
      },
      transitionDuration: {
        short: '250ms',
        long: '500ms',
      },
    },
  },
  variants: {},
  plugins: [],
}
export default config;
