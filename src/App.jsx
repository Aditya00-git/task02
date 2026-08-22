import { useEffect, useState } from 'react'
import { searchLocations, getWeather } from './services/api.js'
import SearchBar from './components/SearchBar.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import ForecastList from './components/ForecastList.jsx'
import LocationPicker from './components/LocationPicker.jsx'
import Loader from './components/Loader.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'

import Preloader from './components/fx/Preloader.jsx'
import ScrollProgress from './components/fx/ScrollProgress.jsx'
import GradientOrb from './components/fx/GradientOrb.jsx'
import ThemeToggle from './components/fx/ThemeToggle.jsx'
import MagneticBtn from './components/fx/MagneticBtn.jsx'
import TextScramble from './components/fx/TextScramble.jsx'
import { AnimatedTextLines } from './components/fx/AnimatedTextLines.jsx'

const DEFAULT_CITY = 'Ahmedabad'

export default function App() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [showPreloader, setShowPreloader] = useState(true)

  const [locationOptions, setLocationOptions] = useState(null) // set when a search is ambiguous
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)

  async function runSearch(cityName) {
    setStatus('loading')
    setErrorMsg('')
    setLocationOptions(null)
    try {
      const results = await searchLocations(cityName)
      if (results.length === 0) {
        setStatus('error')
        setErrorMsg(`No results for "${cityName}". Try a different spelling.`)
        return
      }
      if (results.length === 1) {
        await loadWeatherFor(results[0])
      } else {
        setLocationOptions(results)
        setStatus('idle')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(describeError(err))
    }
  }

  async function loadWeatherFor(loc) {
    setStatus('loading')
    setErrorMsg('')
    setLocationOptions(null)
    try {
      const data = await getWeather(loc.latitude, loc.longitude)
      setLocation(loc)
      setWeather(data)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(describeError(err))
    }
  }

  function describeError(err) {
    return err.response
      ? `Server responded with ${err.response.status}.`
      : err.message || 'Something went wrong.'
  }

  useEffect(() => {
    runSearch(DEFAULT_CITY)
  }, [])

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      <ScrollProgress />

      <div className="app">
        <div className="app__bg">
          <GradientOrb x="85%" y="8%" size={480} color="#5ec8ff" opacity={0.08} />
        </div>

        <header className="app__header">
          <div className="app__header-row">
            <span className="app__eyebrow">React · Axios · Reusable Components</span>
            <ThemeToggle />
          </div>

          <h1 className="app__title">
            <TextScramble text="Weather" />
            <span className="app__accent">.</span>
          </h1>

          <AnimatedTextLines
            text={"Live conditions and a 6-day forecast for any city.\nPowered by the free Open-Meteo API."}
            className="app__subtitle"
          />
        </header>

        <main className="app__main">
          <SearchBar onSearch={runSearch} loading={status === 'loading'} />

          {locationOptions && (
            <LocationPicker results={locationOptions} onSelect={loadWeatherFor} />
          )}

          {status === 'loading' && <Loader label="Fetching weather…" />}

          {status === 'error' && (
            <ErrorMessage message={errorMsg}>
              <MagneticBtn>
                <button className="error-box__retry" onClick={() => runSearch(location?.name ?? DEFAULT_CITY)}>
                  Try again
                </button>
              </MagneticBtn>
            </ErrorMessage>
          )}

          {status === 'success' && weather && location && (
            <>
              <WeatherCard location={location} current={weather.current} />
              <ForecastList daily={weather.daily} />
            </>
          )}
        </main>

        <footer className="app__footer">
          <p>Data: open-meteo.com — refreshed on search.</p>
        </footer>
      </div>
    </>
  )
}
