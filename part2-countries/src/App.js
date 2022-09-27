import { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './components/Display';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        setCountries(response.data);
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      find countries <input value={filter} onChange={handleFilter} />
      <Display countries={countries} filter={filter}/>
    </div>
  )
}

export default App;
