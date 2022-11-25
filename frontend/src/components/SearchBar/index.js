import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as userActions from '../../store/users';
import * as trackActions from '../../store/track';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Searchbar.css';
import { useEffect } from 'react';

const SearchBar = () => {

    const [value, setValue] = useState("");
    const userList = useSelector(userActions.getUsers);
    const trackList = useSelector(trackActions.getTracks);
    const [data, setData] = useState([]);

    useEffect(() => {
        const allData = [];
        userList.map((el) => allData.push(el.username));
        trackList.map((el) => allData.push(el.title));
        console.log(allData);
    }, [userList, trackList])

    return ( 
        <div className='header-search-container'>
            <div className='header-search'>
                <input type="text" value={value} 
                onChange={(e) => setValue(e.target.value)}
                className="search"
                />
                <button className='search-button'>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size='sm'/>
                </button>
            </div>
            <div className='search-dropdown'>
                {userList.map((searchItem) => (
                    <div>
                        {searchItem.username ? searchItem.username : searchItem.title} 
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default SearchBar;
