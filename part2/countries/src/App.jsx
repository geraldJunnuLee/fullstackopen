import { useEffect, useState } from 'react'
import axios from 'axios'
import SingleCountryDetails from './components/SingleCountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter((country) => {
    if (searchValue.length === 0) return null
    return country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  })

  return (
    <div className='App'>
      <div style={{ display: 'flex' }}>
        <p>find countries</p>
        <input
          type='text'
          value={searchValue}
          onChange={({ target }) => setSearchValue(target.value)}
        />
      </div>
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          filteredCountries.map((country) => {
            return filteredCountries.length > 1 ? (
              <div key={country.name.common} style={{ display: 'flex' }}>
                <p>{country.name.common}</p>
                <button onClick={() => setSearchValue(country.name.common)}>
                  show
                </button>
              </div>
            ) : (
              <SingleCountryDetails
                key={country.name.common}
                country={country}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

export default App
