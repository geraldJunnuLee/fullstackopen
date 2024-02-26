import { useEffect, useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = (name) => {
  const [countryName, setCountryName] = useState(null)
  const [country, setCountry] = useState(null)
  const [error, setEerror] = useState(null)

  const handleSearchCountry = () => {
    setCountryName(name)
  }

  useEffect(() => {
    if (!countryName) return

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((response) => {
        setCountry(response.data)
        setEerror(null)
      })
      .catch((error) => {
        setEerror(error.response.data.error)
      })
  }, [countryName])

  return {
    handleSearchCountry,
    country,
    error,
  }
}
