import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

const App = () => {

    const [ json, setJson ] = useState([]);
    const [ shortJson, setShortJson ] = useState([])
    const [ search, setSearchValue ] = useState("")
    const [ country, setCountry ] = useState({})

    const handleSearch = event => {
        let value = event.target.value
        setSearchValue(value)
        let arr = []
        let i = 0;
        for(var country of json){
            if(country.name.toLowerCase().includes(value.toLowerCase())){
                arr.push(country);
            }
        }
        if(arr.length === 1){
            setCountry(arr[0]);
        }
        setShortJson(arr)
        console.log(arr)
      }

      const showCountry = value => {
            for(var country of json){
                if(country.name.toLowerCase() === value.toLowerCase()){
                    setCountry(country)
                    setShortJson([country])
                }
            }
        }

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then(response => {
            setJson(response.data)
        })
        return;
    }, [])

    return (
        <div>
            <Search value={search} change={handleSearch} />
            
            { shortJson.length > 1 &&
                <SearchResults results={shortJson} show={showCountry} />
            }
            { shortJson.length == 1 && 
                <CountryData country={country} />
            }
        </div>
    )
}

const Search = ({value, change}) => {
    return(
        <input type="text" value={value} onChange={change} />
    )
}

const SearchResults = ({results, show}) => {
    const select = value => {
        show(value)
    }
    return(
        <div>
            { (results.length > 10) ? (
                <p>Too many matches, please specify</p>
            ) : (
                results.map((result, key) => 
                    <p key={key} >{result.name}<button onClick={() => select(result.name)}>show</button></p>
                 )
            )}
            
        </div>
    )
}

const CountryData = ({country}) => {
    const [ weather, setWeather ] = useState({})
    const [ set, setSet ] = useState(false)
    useEffect(() => {
        axios.get(`https://api.apixu.com/v1/current.json?key=ed7f4eb04f04466e9cf183327191804&q=${country.capital}`).then(response => {
            console.log(response.data.current.condition.icon)
            setWeather(response.data.current)
            setSet(true)
            
        })
        return;
    }, [])
    return(
        <div>
            <h1>
                {country.name}
            </h1>
            <p>Capital: {country.capital} <br />
            Population: {country.population}</p>
            <h3>Languages:</h3>
            <ul>
                {
                    country.languages.map((lang, key) => 
                        <li key={key}>{lang.name}</li>
                    )
                }
            </ul>
            <img src={country.flag} alt="flag" width="200px" />
            <h5>Weather in {country.capital}</h5>
            <p><b>Temperature: </b>{weather.temp_c}C</p>
            <p><b>Wind: </b>{weather.wind_kph} km/h & direction {weather.wind_dir}</p>
            { set && 
                <img src={weather.condition.icon} />
            }
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
