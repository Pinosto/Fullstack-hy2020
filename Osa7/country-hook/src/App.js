import React, { useState, useEffect } from 'react'
import axios from 'axios'

const baseURL = 'https://restcountries.eu/rest/v2/name'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const url = `${baseURL}/${name}?fullText=true`
  //console.log(url)
  useEffect(() => {
    if (!name) {
      setCountry({ found: undefined })
      //console.log('return')
      return
    }
    const fetch = async () => {
      try {
        const response = await axios.get(url)
        //console.log( response.data[0])
        setCountry({ found: true, data: response.data[0] })
      } catch (e) {
        //console.log('no data')
        // console.error(e)
        setCountry({ found: false })
      }
    }
    fetch()
  }, [url, name]);

  return country
}

const Country = ({ country }) => {
  if (country?.found === undefined) {
    return <div>anna maa</div>
  }
  if (!country.found) {
    return <div>ei löytynyt...</div>
  }
  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App