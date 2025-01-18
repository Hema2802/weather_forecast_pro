/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./weather_forecast_pro/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        body:["Nunito"]
      },
      keyframes:{
        zoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.25)' },
        },
        
      },
      animation: {
        zoom: 'zoom 3s infinite', // 3 seconds for one cycle
      },
      backgroundImage: {
        'beach-sea': "url('/weather_forecast_pro/beach-sea.jpg')",
        
      }
    },
    
  },
  plugins: [],
}

