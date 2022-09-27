import Weather from './Weather';

const CountryInfo = ({ country }) => {
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
      <Weather country={country}/>
    </div>
  )
}

  export default CountryInfo;