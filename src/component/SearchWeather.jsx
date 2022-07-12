import React, { useState, useEffect } from "react";

export default function SearchWeather() {
  const [search, setSearch] = useState("Pune");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=e921b6c3949458e5e779193636b6d173`
      );
      if (componentMounted) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, []);

  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);

  return (
    <div>
      <div className="container">
        <form>
          <input type="search" placeholder="Search" name="search" value={input} onChange={(e)=>setInput(e.target.value)} required/>
          <button type="submit">Search</button>
        </form>
        <div>
          <h2>{data.name}</h2>
          <p>{temp}&deg;C</p>
          <p>{temp_max}&deg;C</p>
          <p>{temp_min}&deg;C</p>
        </div>
      </div>
    </div>
  );
}
