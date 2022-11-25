import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Searchbar.css';

const SearchBar = () => {

    const [value, setValue] = useState("");
    
    console.log(value);

    return ( 
        <div className='header-search'>
            <input type="text" value={value} 
            onChange={(e) => setValue(e.target.value)}
            className="search"
            />
            <button className='search-button'>
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size='s'/>
            </button>
        </div>
     );
}
 
export default SearchBar;
