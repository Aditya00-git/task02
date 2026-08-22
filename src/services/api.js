import axios from 'axios'

// Open-Meteo is a free weather API that needs no API key/signup — good fit for a
// demo project. Two endpoints are used: geocoding (turn a city name into
// lat/lon) and forecast (turn lat/lon into current + daily weather).
const geoClient = axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1',
  timeout: 8000,
})

const weatherClient = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 8000,
})

/**
 * Look up candidate locations for a city name.
 * @param {string} name
 * @returns {Promise<Array<{id, name, country, admin1, latitude, longitude}>>}
 */
export async function searchLocations(name) {
  const response = await geoClient.get('/search', {
    params: { name, count: 5, language: 'en', format: 'json' },
  })
  return response.data.results ?? []
}

/**
 * Fetch current conditions + a short daily forecast for a lat/lon.
 * @param {number} latitude
 * @param {number} longitude
 */
export async function getWeather(latitude, longitude) {
  const response = await weatherClient.get('/forecast', {
    params: {
      latitude,
      longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min',
      timezone: 'auto',
      forecast_days: 6,
    },
  })
  return response.data
}

export default { searchLocations, getWeather }
