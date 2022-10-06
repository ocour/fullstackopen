import { useState } from 'react';
import CountryInfo from './CountryInfo'

const DisplayButton = ({ country }) => {
    const [countriesToShow, setCoutriesToShow] = useState(false);

    const handleCountriesToShow = () => {
        setCoutriesToShow(!countriesToShow);
    }

    return (
        <div>
            <button onClick={handleCountriesToShow}>
                {countriesToShow ? 'hide' : 'show'}
            </button>
            {countriesToShow ? <CountryInfo country={country}/> : null}
        </div>
    )
}

const Country = ({ countries }) => {

    return (countries.map(country => 
        <div key={country.name.common}>
            <p>
                {country.name.common}
            </p>
            <DisplayButton country={country}/>
        </div>
    ))
}

export default Country;