import { useState, useEffect } from 'react';
import axios from 'axios';

const Display = ({ countries, filter }) => {

  // console.log(filter);

  // Filters from countries array
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase()));

  // console.log(filteredCountries);

  if(filteredCountries.length > 10)
  {
    return <p>Too many matches, specify another filter</p>;
  }
  else if(filteredCountries.length === 1)
  {
    const country = filteredCountries[0];
    // console.log(country);
    // Convert object to array so i can map it, its easier this way
    const languages = Object.entries(country.languages);

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {languages.map(language => <li key={language[0]}>{language[1]}</li>)}
        </ul>
        <img src={country.flags.png}></img>
      </div>
    )
  }

  const displayCountries = filteredCountries.map(country => 
    <p key={country.name.common}>{country.name.common}</p>
  );

  return displayCountries;
}

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        setCountries(response.data);
      })
      console.log("i fire once");
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  // console.log("Countries", countries);

  return (
    <div>
      find countries
      <input value={filter} onChange={handleFilter} />
      <Display countries={countries} filter={filter} />
    </div>
  )
}

export default App;
