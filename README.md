# Weather — React API Project

Search any city, see current conditions and a 6-day forecast. Built with reusable
components, loading/error states, and search — plus a few small, subtle motion
touches reused from an earlier project.

## Live demo
_Add your deployed link here after publishing (see Deployment section below)._

## Tech stack

- React 18 + Vite
- Axios (HTTP client)
- GSAP + `@gsap/react` for a few small motion touches (preloader, scroll bar, hero orb)
- Plain CSS (no framework) — custom design system with light/dark theme variables

## Project structure

```
weather-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx        # city search input + quick-pick chips
│   │   ├── LocationPicker.jsx   # disambiguation list when a search matches multiple cities
│   │   ├── WeatherCard.jsx      # current conditions, presentational
│   │   ├── ForecastList.jsx     # 6-day forecast strip
│   │   ├── Loader.jsx           # loading indicator
│   │   ├── ErrorMessage.jsx     # error state, accepts a retry button as children
│   │   └── fx/                  # small motion components (preloader, scroll bar, etc.)
│   ├── services/
│   │   └── api.js               # axios instances + API call functions
│   ├── utils/
│   │   ├── weatherCodes.js      # WMO weather code → label/icon lookup
│   │   └── isMobile.js          # skips effects on touch/narrow devices
│   ├── App.jsx                  # data fetching, state, search flow
│   ├── index.css                 # design system, theme variables, styling
│   └── main.jsx                  # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## Setup

```bash
npm install
npm run dev       # start local dev server (http://localhost:5173)
npm run build      # production build -> dist/
npm run preview    # preview the production build locally
```

## What it does

- On load, fetches weather for a default city (Ahmedabad) so the page isn't empty.
- **Search**: type a city name and submit, or tap one of the quick-pick chips.
- If the city name matches more than one place (e.g. "Springfield"), a
  **LocationPicker** lists the candidates (with region/country) so you can disambiguate
  before fetching weather for the wrong one.
- Shows a **loading** state while requests are in flight.
- Shows an **error** state with a reason and a **Retry** button on failure (network
  error, timeout, non-2xx response, or "no results found").
- On success, renders a **WeatherCard** (current temp, feels-like, humidity, wind) and
  a **ForecastList** strip (6 days, high/low, condition icon).

## API documentation notes

**API used:** [Open-Meteo](https://open-meteo.com) — free, no API key or signup
required, generous rate limits for non-commercial use. Two endpoints are used.

| Endpoint | Method | Purpose | Used in |
|---|---|---|---|
| `https://geocoding-api.open-meteo.com/v1/search` | GET | Turns a city name into a list of candidate locations (name, country, admin region, lat/lon) | `searchLocations()` in `src/services/api.js` |
| `https://api.open-meteo.com/v1/forecast` | GET | Returns current conditions + a daily forecast for a given lat/lon | `getWeather()` in `src/services/api.js` |

**Key query params used on `/forecast`:**

```
latitude, longitude          — from the geocoding step
current=temperature_2m,relative_humidity_2m,apparent_temperature,
        weather_code,wind_speed_10m,is_day
daily=weather_code,temperature_2m_max,temperature_2m_min
timezone=auto
forecast_days=6
```

**Sample response shape (trimmed):**

```json
{
  "current": {
    "temperature_2m": 29.4,
    "relative_humidity_2m": 41,
    "apparent_temperature": 31.1,
    "weather_code": 1,
    "wind_speed_10m": 11.2
  },
  "daily": {
    "time": ["2026-08-22", "2026-08-23", "..."],
    "weather_code": [1, 2, 3],
    "temperature_2m_max": [34.1, 33.6, 32.9],
    "temperature_2m_min": [25.0, 24.8, 24.3]
  }
}
```

**Weather codes:** Open-Meteo returns WMO numeric weather codes (0 = clear sky, 61 =
slight rain, 95 = thunderstorm, etc.) rather than text. `src/utils/weatherCodes.js`
maps the codes used in this app to a label + emoji icon.

**Error handling approach:**
- Axios throws on non-2xx responses and network failures; `App.jsx` distinguishes a
  server-returned error (`err.response.status`) from a network/timeout error
  (`err.message`).
- A `timeout: 8000` (ms) is set on both Axios instances.
- A geocoding search that returns zero results is treated as a (non-throwing) error
  state with a clear message, since it isn't an HTTP failure.

**Rate limits / auth:** none required for non-commercial use at this volume — safe to
demo without secrets. If you later swap to a key-based provider (OpenWeatherMap, etc.),
put the key in a `.env` file (`VITE_WEATHER_API_KEY=...`) and read it via
`import.meta.env.VITE_WEATHER_API_KEY`; it's already covered by `.gitignore`.

## Deployment

Any static host works since this is a Vite SPA.

**Vercel**
```bash
npm i -g vercel
vercel
```

**Netlify**
```bash
npm run build
# drag-and-drop the dist/ folder at https://app.netlify.com/drop
```

After deploying, paste the live URL at the top of this README for your submission.

## Possible extensions

- Debounce the search input and show live suggestions as you type.
- Use the browser's Geolocation API to default to the user's current location.
- Hourly forecast view, not just daily.
- Persist the last-searched city to `localStorage`.
