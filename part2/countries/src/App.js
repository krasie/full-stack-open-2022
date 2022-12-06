import { useState,useEffect  } from 'react'
import axios from 'axios'


const Weather = ({lat,lon,api_key}) =>{
  const [weather, setWeather] = useState({"weather":[{"id":0,"main":null,"description":null,"icon":"04d"}],"base":null,"main":{"temp":0},"visibility":0,"wind":{"speed":0},"clouds":{"all":0},"dt":0,"sys":{"sunrise":0,"sunset":0},"timezone":0,"id":0,"name":"","cod":0})

  useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`).then(
      response => {
        setWeather(response.data)
      }
    )
  }, [lat,lon])

  const img = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return(
    <div>
      <h2>Weather</h2>
      temperature {weather.main.temp} Celsius 
      <div><img src={img}/></div>
      <div>wind {weather.wind.speed}m/s</div>
    </div>
  )
}



const App = () =>{
  const [countries, setCountries] = useState([])
  const [match, setMatch] = useState('')
  

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then(
      response => {
        setCountries(response.data)
      }
    )
  }, [])




  const handleMatch = (event) =>{
    setMatch(event.target.value)
  }

  const handleShowDetail = (countryName) => {
    setMatch(countryName)
  }

  const CountriesMatch = ({countries,match}) => {
    if(match === ''){
      return ''
    }else{
      const countriesMatchShow = countries.filter(countries => countries.name.common.indexOf(match) != -1)
      if(countriesMatchShow.length > 10){
        return (<>Too many matches,specify another filter</>)
      }
      if(countriesMatchShow.length == 1){
        const countryOne = countriesMatchShow[0]
        const [lat,lon] = countryOne.latlng
        const api_key = process.env.REACT_APP_API_KEY
      
        return (
          <>
            <h2>{countryOne.name.common}</h2>
            <p>capital {countryOne.capital}</p>
            <p>area {countryOne.area}</p>
            <p>languages:</p>
            <ul>
              {Object.keys(countryOne.languages).map((k,i) => <li key={i}>{countryOne.languages[k]}</li>)}
            </ul>
            <img src={countryOne.flags.png} width='200px'></img>
            <Weather lat={lat} lon={lon} api_key={api_key} />

          </>
        )
      }
      return (
        countriesMatchShow.map(
          countriesMatchShow => 
          <div key={countriesMatchShow.name.common}>
              {countriesMatchShow.name.common}<button onClick={() => handleShowDetail(countriesMatchShow.name.common)}>show</button>
          </div>
          )
      )
    }    
  }

  return(
    <div>
      find countries <input value={match} onChange={handleMatch}></input>
      <div>
        <CountriesMatch countries={countries} match={match} />
      </div>
    </div>
  )
}

export default App;