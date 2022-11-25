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
        const newData = [];
        userList.map((el) => allData.push(el.username));
        trackList.map((el) => allData.push(el.title));
        for (let i = 0; i < userList.length; i++) {
            newData.push({
                key: i,
                name: allData[i]
            });
        };
        setData(newData);
    }, [userList, trackList]);

    const handleClick = (searchItem) => {
        setValue(searchItem);
        console.log(searchItem);
    }

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
                {data.filter((searchItem) => {
                    const searchValue = value.toLowerCase();
                    const name = searchItem.name.toLowerCase();
                    return (
                        searchValue && name.startsWith(searchValue) && searchValue !== name
                    );
                }).map((searchItem) => (
                    <div className='search-result'
                    onClick={() => handleClick(searchItem.name)}
                    key={searchItem.key}
                    >
                        <div className='search-result-icon'>
                            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size='sm'/>       
                        </div>
                        <div className='search-result-name'>
                            {searchItem.name}
                        </div> 
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default SearchBar;
