import { useState,useEffect  } from 'react'
import axios from 'axios'


const App = () =>{
  const [countries, setCountries] = useState('')
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
    console.log(countryName)
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
        console.log(countryOne.languages);
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