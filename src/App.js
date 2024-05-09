
import React, { useState, useEffect } from 'react'

const api = {
    key: "6e4f5915bf4e0f9181abbe1409077323" ,
    base: "https://openweathermap.org/data/2.5/"
}



function App() {
    const [searchInput, setSearchInput] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [weatherInfo, setWeatherInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    
    useEffect(()=> {
        const fetchWeather = async () => {
            if(!searchCity) return;
            setLoading(true);
            try {
                const url = `${api.base}weather?q=${searchCity}&unnits=metric&APPID=${api.key}`
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok){
                 setWeatherInfo(`${data.name}, ${data.sys.country}, ${data.weather[0]}, ${data.description}`)
                 setErrorMessage("");
                }
                setErrorMessage(data.message)
            } catch (error) {
                setErrorMessage(error.message)
            }
            setLoading(false);
        };
        fetchWeather();
    }, [searchCity])

    const handleSubmit = (e) => {
      e.preventDefault();
      setSearchCity(searchInput);
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder="City"
        value={searchInput} 
        onChange={(e)=> setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      {loading ? (<>Loading ...</>) : 
      (<>{errorMessage ? 
      (<div style={{color: "red"}}>{errorMessage}</div>) 
      :( <div>{weatherInfo}
      </div>
      )}
      </>
    )}
       
    </div>
  )
}

export default App
