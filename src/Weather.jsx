import React, { useState } from 'react'
import './Weather.css'


const api = {
    key: "94592d1762796490b9526de61473fdb6",
    base: "https://api.openweathermap.org/data/2.5/"
}
const Weather = () => {
    const [qeury,setQeury] = useState();
    const [weather,setWeather] = useState({});

    const search = evt => {
        if(evt.key === "Enter"){
            fetch (`${api.base}weather?q=${qeury}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQeury('');
            })
        }
    }

    const dateBuilder = (d) => {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];

          let day = days[d.getDay()];
          let date = d.getDate();
          let month = months[d.getMonth()];
          let year = d.getFullYear();

          return `${day} ${date} ${month} ${year}`
    }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp>16) ? 'app warm' : 'app'): 'app'}>
      <main>
        <div className='search-box'>
            <input type='text' className='search-bar' placeholder='Search...' value={qeury} onChange={e => setQeury(e.target.value)} onKeyPress={search} />
        </div>
        {(typeof weather.main != "undefined")?(
        <div className='location-box'>
            <div className='location'>
                {weather.name},{weather.sys.country}
            </div>
            <div className='date'>{dateBuilder(new Date())}</div>
            <div className='weather-box'>
                <div className='temp'>{Math.round(weather.main.temp)}°c</div>
                <div className='weather'>{weather.weather[0].main}</div>
            </div>
        </div>
         ) : (' ')}
      </main>
    </div>
  )
}

export default Weather
