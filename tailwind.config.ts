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
      colors: {
        'white-alpha-20': 'hsla(0, 0%, 100%, 0.2)',
        'on-background': 'hsla(220, 100%, 95%, 1)',
        'on-surface': 'hsla(250, 100%, 95%, 1)',
        'on-surface-variant': 'hsla(250, 1%, 44%, 1)',
        primary: 'hsla(349, 100%, 43%, 1)',
        'primary-variant': 'hsla(349, 69%, 51%, 1)',
        "primary-variant-2": 'hsl(349, 69%, 39%)',
        'rating-color': 'hsla(44, 100%, 49%, 1)',
        surface: 'hsla(250, 13%, 11%, 1)',
        "surface-transparent": 'hsla(250, 13%, 11%, 0)',
        "surface-transparent-90-percent": 'hsla(250, 13%, 11%, 0.9)',
        'text-color': 'hsla(250, 2%, 59%, 1)',
        white: 'hsla(0, 0%, 100%, 1)',
        background: 'hsla(220, 17%, 7%, 1)',
        "background-half-transparent": 'hsla(220, 17%, 7%, 0.5)',
        'banner-background': 'hsla(250, 6%, 20%, 1)',
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
      gridTemplateColumns: {
          // grid auto-fill technique
          "autofill-200": "repeat(auto-fill, minmax(200px, 1fr))",
          "desktop-main": "250px 1fr"
      },
      width: {
        "full-minus-40px": "calc(100% - 40px)",
      },
      height: {
        "main-height": "calc(100vh - var(--header-height))"
      },
      spacing: {
        "header-height": "var(--header-height)",
        "400px-to-left": "calc(100% - 400px)",
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
      backgroundSize: {
       '50px': '50px',
      },
      transitionDuration: {
        short: '250ms',
        long: '500ms',
      },
      keyframes: {
       loading: {
         '0%': {transform: "rotate(0)"},
         '100%': {transform: "rotate(1turn)"}
       }
      },
      animation: {
        loading: "loading 500ms linear infinite",
      },
      screens: {
        "tablet": "575px",
        "desktop": "1200px",
      }
    },
  },
  variants: {},
  plugins: [
  ],
}
export default config;
