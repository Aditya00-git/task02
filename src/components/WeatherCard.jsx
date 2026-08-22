import { describeWeatherCode } from '../utils/weatherCodes.js'

export default function WeatherCard({ location, current }) {
  const { label, icon } = describeWeatherCode(current.weather_code)

  return (
    <article className="weather-card">
      <div className="weather-card__location">
        <h2>{location.name}</h2>
        <span>
          {[location.admin1, location.country].filter(Boolean).join(', ')}
        </span>
      </div>

      <div className="weather-card__main">
        <span className="weather-card__icon" aria-hidden="true">
          {icon}
        </span>
        <span className="weather-card__temp">{Math.round(current.temperature_2m)}°</span>
      </div>

      <p className="weather-card__label">{label}</p>

      <div className="weather-card__stats">
        <div>
          <span className="weather-card__stat-label">Feels like</span>
          <span className="weather-card__stat-value">{Math.round(current.apparent_temperature)}°</span>
        </div>
        <div>
          <span className="weather-card__stat-label">Humidity</span>
          <span className="weather-card__stat-value">{current.relative_humidity_2m}%</span>
        </div>
        <div>
          <span className="weather-card__stat-label">Wind</span>
          <span className="weather-card__stat-value">{Math.round(current.wind_speed_10m)} km/h</span>
        </div>
      </div>
    </article>
  )
}
