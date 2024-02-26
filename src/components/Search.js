import React, {useState} from 'react';

const Search = ({onSelectItem}) =>{

    const [searchResults, setSearchResults] = useState([])
    const [query, setQuery] = useState('')
    const inputChangeHandler = (event) =>{
        setQuery(event.target.value)
    }
    const onSelect = (city) =>{
        onSelectItem(city)
        setSearchResults([])
    }
    const buttonClickHandler = () =>{
        fetch(`http://api.openweather.org/geo/1.0/direct/?query=${query}&limit=5`)
            .then((result) =>{
                return result.json()
            })
            .then((cities) =>{
                setSearchResults((cities.map((city)=>({
                    name:city.name,
                    country:city.country,
                    lat: city.lat,
                    lon: city.lon
                }))))
            })
    }
    return (
        <div className="search-container">
        <div className="input-container">
            <h1>Weather Application</h1>
            <input type="test" data-testid="search-input" onChange={inputChangeHandler}/>
            <button data-testid="search-button" onClick={buttonClickHandler}>Search</button>
        </div>
        {
            searchResults.length> 0 &&
            <div data-testid="search-results" className="search-results">
                {searchResults.map((city) => <div className="search-result" key={`${city.lat}-${city.lon}`}
                                                  onClick={() => onSelect(city)}>
                    <span className="city-name">{city.name}</span>
                    <span className="city-location">{city.lat}, {city.lon}</span>
                </div>
            )}</div>
        }
        </div>
    );
}

export default Search