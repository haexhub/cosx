import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    boxShadow: {
      'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // If a DEFAULT shadow is provided, it will be used for the non-suffixed shadow utility.
      'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      'none': 'none',
    },
    extend: {
      colors: {
        primary: "#0a9396",
        'primary-focus': "#08777a",
        'primary-hover': "#08777a",
        secondary: "#008000",
        'secondary-focus': "#007200",
        'secondary-hover': "#007200",
        tertiar: "#48cae4",
        background: "#11202C",
        'background-overlay': "#1D3549",
        'background-focus': "#1D3549",
        'background-hover': "#1D3549",
        warning: "#db333c",
        "warning-focus": "#AF282F",
        "warning-hover": "#AF282F",
        directory: "#68C3D4",
        'directory-focus': "#40B5C9",
        'directory-hover': "#40B5C9",
        key: "#9B15F4",
        'key-focus': "#9B15F4",
        'key-hover': "#9B15F4"
      },
    },
    /* screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    }, */
  },
})