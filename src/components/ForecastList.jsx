import { describeWeatherCode, formatDay } from '../utils/weatherCodes.js'

export default function ForecastList({ daily }) {
  if (!daily?.time?.length) return null

  return (
    <div className="forecast">
      {daily.time.map((date, i) => {
        const { icon, label } = describeWeatherCode(daily.weather_code[i])
        return (
          <div key={date} className="forecast__day">
            <span className="forecast__day-name">{formatDay(date, i)}</span>
            <span className="forecast__icon" title={label} aria-hidden="true">
              {icon}
            </span>
            <span className="forecast__temps">
              <span className="forecast__max">{Math.round(daily.temperature_2m_max[i])}°</span>
              <span className="forecast__min">{Math.round(daily.temperature_2m_min[i])}°</span>
            </span>
          </div>
        )
      })}
    </div>
  )
}
