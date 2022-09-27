import { useState, useEffect } from 'react';
import axios from 'axios';

const SingleCountry = ({ filteredCountries }) => {
  const country = filteredCountries[0];

  // Dummy code, i wanted to see if it was possible to use useEffect in anther component which was inside
  // an if statement.
  // useEffect(() => {
  //   axios
  //     .get(`https://restcountries.com/v3.1/name/${country.name.common}`)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     console.log("i fire once2");
  // }, [])

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
      <img src={country.flags.png} height="100"></img>
    </div>
  )
}

const Display = ({ countries, filter, show, handleSetShow }) => {

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
    return <SingleCountry filteredCountries={filteredCountries}/>;
  }

  console.log("Display rendered", show);
  const displayCountries = filteredCountries.map(country => 
    <div key={country.name.common}>
      <p>
        {country.name.common}
        <button onClick={() => handleSetShow(country.name.common)}>
          {show.includes(country.name.common)
            ? 'hide'
            : 'show'
          }
        </button>
      </p>
      {show.includes(country.name.common) 
        ? <img src={country.flags.png} height="100"></img> 
        : console.log("NO")
      }
    </div>
  );

  // console.log(show)

  return displayCountries;
}

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState([]);

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

  const handleSetShow = (countryToShow) => {
    //console.log(show.includes(countryToShow));

    // If show has country, remove it
    if(show.includes(countryToShow))
    {
      const index = show.indexOf(countryToShow)
      // React didnt rerender Display if i didnt to the following,
      // Something about "its the same array so react doesnt see the need to rerender"
      const newArray = [...show];
      newArray.splice(index, 1);
      setShow(newArray);
    }
    // Add it
    else
    {
      setShow(show.concat(countryToShow));
    }
  }

  // console.log("Countries", countries);
  console.log("Rendered App");

  return (
    <div>
      find countries
      <input value={filter} onChange={handleFilter} />
      <Display countries={countries} filter={filter} show={show} handleSetShow={handleSetShow}/>
    </div>
  )
}

export default App;
