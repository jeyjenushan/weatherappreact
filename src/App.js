
import './App.css'

/*images*/
import cloud from './assets/cloud.jpeg';
import drizzle from './assets/drizzle.jpeg';
import humaidity from './assets/humidity.jpeg';
import rain from './assets/rain.jpeg'
import searchi from './assets/search.png'
import snow from './assets/snow.jpeg'
import wind from './assets/wind.jpeg'
import sunny from './assets/sunny.png'
import { useEffect, useState } from 'react';

const WeatherDetails=({icon,temp,city,country,lat,log,humidity,winds})=>{
  return(
    <>
    <div className='images'>
      <img src={icon} alt='image' className='weatherimage'/>
    </div>

    <div className='temp'>{temp}C</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>

    <div className='cord'>
      <div>
        <span className='lat'>Latitude</span>
        <span>{lat}</span>
      </div>
      <div>
      <span className='log'>Longtitude</span>
      <span>{log}</span>
      </div>
    </div>


    <div className='data-container'>
      <div className='element'>
<img src={humaidity} alt='humidity' className='icons' />
<div className='data'>
<div className='humidity-percent'>{humidity}%</div>
<div className='text'>Humidity</div>
      </div>
      </div>
      <div className='element'>
<img src={wind} alt='wind' className='icons' />
<div className='data'>
<div className='wind-percent'>{winds}%</div>
<div className='text'>Wind Speed</div>
      </div>
      </div>
    </div>

    </>
  )
}

function App() {
  const apiKey='fd2296f87c1328a7017a2f54da33d7fa';
  const[text,setText]=useState("colombo");
  const[icon,setIcon]=useState(snow)
  const[temp,setTemp]=useState(0)
  const[city,setCity]=useState("colombo")
  const[country,setCountry]=useState("Srilanka")
  const[lat,setLat]=useState(0)
  const[log,setLog]=useState(0)
  const[humidity,setHumidity]=useState(0)
  const[winds,setWinds]=useState(0)
  const[cityNotFound,setCityNotFound]=useState(false)
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState(null);

  const weatherIconMap={
    '01d':sunny,
    '01n':sunny,
    "02d":cloud,
    "02n":cloud,
    "03d":drizzle,
    "03n":drizzle,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "14d":snow
  }


  const search=async ()=>{
    setLoading(true)
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`
  

try{
 const data= await fetch(url).then(res=>res.json())
if(data.cod===404){
setCityNotFound(true)
setLoading(false)
return;
}
setHumidity(data.main.humidity);
setWinds(data.wind.speed);
setTemp(Math.floor(data.main.temp))
setCity(data.name)
setCountry(data.sys.country)
setLat(data.coord.lat)
setLog(data.coord.lon)
const weatherIconCode=data.weather[0].icon;
setIcon(weatherIconMap[weatherIconCode] || sunny)
setCityNotFound(false)


}catch(error){

  setError("An error occurred while fetching weather data.")
}finally{
  setLoading(false)
}}
useEffect(()=>{
  search()
},[])





  function handleCity(e){
setText(e.target.value);
  }
  function handleKeyDown(e){
    if(e.key=== "Enter"){
      search();
    }

  }


  return (
    <div className='container'>
      <div className='input-container'>

  <input type='text'
   value={text}
    className='cityInput' 
    onChange={handleCity} 
    placeholder='Search City'
    onKeyDown={handleKeyDown}
    />

     <div className='searchIcon' onClick={()=>search()}>
<img src={searchi} alt='search' className='image' />
     </div>

      </div>
 
{ loading && <div className='loading-message'>Loading..</div> }
{error && <div className='error-message'>{error}</div> }
{cityNotFound && <div className='city-not-found'>City not found</div> }
{!loading && !cityNotFound  && !error &&
<WeatherDetails icon={icon} temp={temp} city={city} country={country}
lat={lat} log={log} humidity={humidity} winds={winds}
/>

}




      <p className='copyright'>
        Designed by <span>Jenushan</span>
      </p>

    </div>
  );
}

export default App;
