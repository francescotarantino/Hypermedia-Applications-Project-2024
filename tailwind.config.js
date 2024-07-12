/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    colors: {
      'accent': '#3A233E',
      'orange': '#EB6343',
      'apricot': '#F59A7A',
      'peach': '#FCD1BD',
      'cream': '#FBF4EB',
      'white': '#FFFFFF'
    },
    fontFamily: {
        'sans': ['Outfit', 'sans-serif'],
    },
    extend: {
      zIndex: {
        'header': 999999,
        'chatbotButton': 1000000,
        'chatbotPanel': 1000001,
      }
    }
  },
  variants: {
    extend: {
      transform: ['hover', 'focus'],
      transitionDuration: ['hover', 'focus'],
      transitionTimingFunction: ['hover', 'focus'],
    },
  },
  plugins: [],
}