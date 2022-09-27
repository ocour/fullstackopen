import CountryInfo from './CountryInfo'
import Country from './Country';

const Display = ({ countries, filter }) => {
    // Filters from countries array
    const filteredCountries = countries.filter(country => 
        country.name.common.toLowerCase().includes(filter.toLowerCase()));

    if(filteredCountries.length > 10)
    {
        return <p>Too many matches, specify another filter</p>;
    }
    else if(filteredCountries.length === 1)
    {
        return <CountryInfo country={filteredCountries[0]}/>;
    }

    return <Country countries={filteredCountries} />
}

export default Display;