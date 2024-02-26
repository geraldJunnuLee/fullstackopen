import { useField, useCountry } from './hooks'
import Country from './components/Country'

const App = () => {
  const nameInput = useField('text')
  const { handleSearchCountry, country, error } = useCountry(nameInput.value)

  const fetch = (e) => {
    e.preventDefault()
    handleSearchCountry()
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      <Country country={country} error={error} />
    </div>
  )
}

export default App
