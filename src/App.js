import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mumbai");
 
//   useEffect(()=>{
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=e4babc5b2cce630428f2970de54dedb7`).then((res)=>{
//         return res.json();
//     }).then((data)=>{
//         setCity(data)
//     }).catch((error)=>{
//         console.log(error)
//     })
// }, [search])
 
useEffect( ()=>{
  const fetchAPi = async () =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=e4babc5b2cce630428f2970de54dedb7`;
    const response = await fetch(url);
    const result = await response.json();
    setCity(result.main);
  };
  fetchAPi();
},[search])

 let history =  localStorage.setItem('recent', search)

  return (
    <>
      <h1 className='heading'>Weather App</h1>
      <div className='main_container'>
        <div className='inputData'>
            <input
            placeholder='Enter city name'
             type="search" className='inputField'
             onChange={(e)=>{setSearch(e.target.value)}} />
        </div>

        {city ? (
          <div className='searchResult'>
            <div classname='resultField'>Weather Report of the City : {search}</div>
            <div classname='resultField'>Current Temperature : {city.temp}°C </div>
            <div classname='resultField'>Temp Range : {city.temp_min}°C to {city.temp_max}°C</div>
            <div classname='resultField'>Humidity : {city.humidity} </div>
            <div classname='resultField'>Pressure: {city.pressure}</div>
          </div>
        ): (
          <>
          <p className='warning'>please Enter valid city Name</p>
          <div className='history'>
            <h2>Last 3 entries</h2>
            {history}
          </div>
          
          </>
          
        )}

      </div>
    </>
  );
}

export default App;
