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
    // const [coutriesToShow, setcoutriesToShow] = useState([]);

    // const handleSetShow = (country) => {
    
    //     // If coutriesToShow has country, remove it
    //     if(coutriesToShow.includes(country))
    //     {
    //         const index = coutriesToShow.indexOf(country)
    //         // React didnt rerender Display if i didnt to the following,
    //         // Something about "its the same array so react doesnt see the need to rerender"
    //         const newArray = [...coutriesToShow];
    //         newArray.splice(index, 1);
    //         setCoutriesToShow(newArray);
    //     }
    //     // Add it
    //     else
    //     {
    //         setcoutriesToShow(coutriesToShow.concat(country));
    //     }
    // }

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