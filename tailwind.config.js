export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8B5E3C',      // Savannah Brown
        'secondary': '#355E3B',    // Safari Green
        'accent': '#E76F51',       // Sunset Orange
        'neutral': '#F8F5F2',      // Sand White
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
