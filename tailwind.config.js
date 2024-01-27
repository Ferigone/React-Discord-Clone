const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#209db6',
        'link-blue': '#00AFF4',
        'dark-blue': '#5865F2',
        'white': '#ffffff',
        'light-gray': '#99aab5',
        'gray-primary': '#36393F',
        'gray': '#2c2f33',
        'dark-gray': '#23272a',
        'black': '#000000',
        'primary': '#16181D',
        'secondary': '#1C1F26',
        'light-hover': '#22262F',
        'lighter-hover': '#8a94a8',
        'hover': '#1c1f26',
        'dark-hover': '#14161a',
        'primary-text': '#576175',
        'default-200': '#1C1F26',
        'default-100': '#1C1F26',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}