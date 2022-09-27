import { useState } from 'react';
import CountryInfo from './CountryInfo'

const Country = ({ countries }) => {
    const [coutriesToShow, setcoutriesToShow] = useState([]);

    const handleSetShow = (country) => {
    
        // If coutriesToShow has country, remove it
        if(coutriesToShow.includes(country))
        {
          const index = coutriesToShow.indexOf(country)
          // React didnt rerender Display if i didnt to the following,
          // Something about "its the same array so react doesnt see the need to rerender"
          const newArray = [...coutriesToShow];
          newArray.splice(index, 1);
          setcoutriesToShow(newArray);
        }
        // Add it
        else
        {
            setcoutriesToShow(coutriesToShow.concat(country));
        }
      }

    return (countries.map(country => 
            <div key={country.name.common}>
            <p>
                {country.name.common}
                <button onClick={() => handleSetShow(country.name.common)}>
                {coutriesToShow.includes(country.name.common)
                    ? 'hide'
                    : 'show'
                }
                </button>
            </p>
            {coutriesToShow.includes(country.name.common) 
                ? <CountryInfo country={country} />
                : null
            }
            </div>
        ))
}

export default Country;