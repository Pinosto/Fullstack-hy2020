import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Api_Key = process.env.REACT_APP_API_KEY

const Weather_api = 'http://api.weatherstack.com/current'
const Countries_api = 'https://restcountries.eu/rest/v2/all'

const Viewcounries = ({ countries, handleSelect }) => {

  const handleButton = (name) => {
    const click = () => {
      console.log("button", name)
      handleSelect(name)
    }
    return click
  }

  if (countries.length === 0) {
    return (
      <p>no results</p>
    )
  }
  if (countries.length === 1) {
    return (
      <div>
        <ViewOneCountry country={countries[0]} />

      </div>
    )
  }
  if (countries.length > 10) {
    return (
      <p>too many matches, specify another filter</p>
    )
  }
  return (<div>
    {countries.map((country) =>
      <p key={country.name}>{country.name} <button value={country.name} onClick={handleButton(country.name)} >show</button></p>)}
  </div>)
}

const ViewOneCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img style={{ border: '1px solid #000000' }} src={country.flag} width="250" alt="" />
      <Weather country={country} />
    </div>
  )
}

const Filter = ({ filter, handleFilter }) => {
  return (
    <p>find countries <input value={filter} onChange={handleFilter} /></p>
  )
}

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const params = {
    access_key: Api_Key,
    query: country.capital
  }
  console.log(params)

  const hook = () => {
    console.log('effect')
    axios
      .get(Weather_api, { params })
      .then(response => {
        console.log('promise fulfilled sää')
        console.log(response.data)
        setWeather(response.data)
      })
  }
  useEffect(hook, [])

  if (weather) {
    console.log("weather tiedot ladattu")
    return (
      <div>
        <h3>Weather in {weather.location.name}</h3>
        <p>temperature: {weather.current.temperature} Celsius</p>
        <img src={weather.current.weather_icons}></img>
        <p>wind: {weather.current.wind_speed} Km/h direction {weather.current.wind_dir}</p>
      </div>
    )
  } else {
    console.log("weather tiedot lataamatta")
    return (
      <div>
        <p>Ladataan säätietoja</p>
      </div>
    )
  }
}


function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const hook = () => {
    console.log('effect')
    axios
      .get(Countries_api)
      .then(response => {
        console.log('promise fulfilled')
        setAllCountries(response.data)
        setFilterCountries(response.data)
        console.log(response.data)
      })
  }
  useEffect(hook, [])

  const handleSelect = (name) => {
    setFilter(name)
    const apu = allCountries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
    setFilterCountries(apu)
    console.log(name)
    console.log(apu)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
    const apu = allCountries.filter(country => country.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterCountries(apu)
    console.log(e.target.value)
    console.log(apu)
  }

  return (
    <div>
      <h1>Maat</h1>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Viewcounries countries={filterCountries} handleSelect={handleSelect} />
    </div>
  );
}

export default App;
