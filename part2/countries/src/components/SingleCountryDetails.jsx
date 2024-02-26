import { useEffect, useState } from 'react'
import axios from 'axios'

const SingleCountryDetails = ({ country }) => {
  const [capitalWeather, setCapitalWeather] = useState(null)
  const languageKeys = Object.values(country.languages)
  const apiKey = import.meta.env.VITE_API_KEY

  useEffect(() => {
    if (!country) return
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${apiKey}&units=metric`
      )
      .then((response) => setCapitalWeather(response.data))
  }, [])

  if (!capitalWeather) return

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <div>
        <p style={{ fontWeight: 'bold' }}>languages:</p>
        <ul>
          {languageKeys.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt='' />
      </div>
      <div>
        <p style={{ fontWeight: 'bold' }}>weather in {country.capital[0]}</p>
        <p>temperature {capitalWeather.main.temp} Celcius</p>
        <img
          src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`}
          alt='weather-icon'
        />
        <p>wind {capitalWeather.wind.speed} m/s</p>
      </div>
    </div>
  )
}

export default SingleCountryDetails
