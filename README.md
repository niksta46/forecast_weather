# forecast_weather

Weather forecast SPA built with React, Vite, and Tailwind CSS. Uses Open-Meteo free API for current weather and 7-day forecasts with interactive charts.

🔗 **Live demo:** [forecast-weather-six.vercel.app](https://forecast-weather-six.vercel.app/)

---

## Tech Stack

- **React 19** — UI framework
- **Vite** — build tool
- **Tailwind CSS** — styling
- **TanStack Query** — data fetching & caching
- **Recharts** — interactive weather charts
- **React Router** — client-side routing
- **Flowbite React** — UI component library
- **Open-Meteo API** — free weather data (no API key required)

---

## Features

- 🌤️ **Current weather** — temperature, humidity, wind speed, pressure, cloud cover, and more
- 📊 **Hourly forecast** — interactive Recharts visualizations for temperature, precipitation, and wind
- 📅 **7-day forecast** — daily high/low temperatures with weather icons
- 🔍 **City search** — geocoding autocomplete with recent searches persistence
- 📍 **Default location** — Tavullia, Italy
- 📱 **Responsive** — mobile-friendly Tailwind layout
- ⏳ **Loading & error states** — handled throughout

---

## How to Run Locally

```bash
# Clone the repo
git clone https://github.com/niksta46/forecast_weather.git
cd forecast_weather

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## License

[MIT](LICENSE)
