import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as userActions from '../../store/users';
import * as trackActions from '../../store/track';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Searchbar.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {

    const history = useHistory();
    const [value, setValue] = useState("");
    const userList = useSelector(userActions.getUsers);
    const trackList = useSelector(trackActions.getTracks);
    const [data, setData] = useState([]);

    useEffect(() => {
        const allData = [];
        const newData = [];
        userList.map((el) => allData.push(el.username));
        trackList.map((el) => allData.push(el.title));
        for (let i = 0; i < allData.length; i++) {
            newData.push({
                key: i,
                name: allData[i]
            });
        };
        setData(newData);
    }, [userList, trackList]);


    const handleSearch = () => {
        const user = userList.filter(function (el) {
            return el.username.toLowerCase() === value.toLowerCase();
        });
        const track = trackList.filter(function (el) {
            return el.title.toLowerCase() === value.toLowerCase();
        });
        if (user[0]) {
            history.push(`/users/${user[0].id}`);
        };
        if (track[0]) {
            const trackUser = userList.filter(function (el) {
                return track[0].username.toLowerCase() === el.username.toLowerCase();
            });
            history.push(`/users/${trackUser[0].id}`);
        };
        setValue("");
    }

    const handleClick = (searchItem) => {
        setValue(searchItem);
    }

    const handleIcon = (searchItem) => {
        const user = userList.filter(function (el) {
            return el.username.toLowerCase() === searchItem.toLowerCase();
        });
        const track = trackList.filter(function (el) {
            return el.title.toLowerCase() === searchItem.toLowerCase();
        });
        if (user[0]) {
            history.push(`/users/${user[0].id}`);
        };
        if (track[0]) {
            const trackUser = userList.filter(function (el) {
                return track[0].username.toLowerCase() === el.username.toLowerCase();
            });
            history.push(`/users/${trackUser[0].id}`);
        }
        setValue("");
    }

    return ( 
        <div className='header-search-container'>
            <div className='header-search'>
                <input type="text" value={value} 
                onChange={(e) => setValue(e.target.value)}
                className="search"
                />
                <button className='search-button'
                onClick={handleSearch}
                >
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
                    key={searchItem.key}
                    >
                        <div className='search-result-icon'
                        onClick={() => handleIcon(searchItem.name)}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size='sm'/>       
                        </div>
                        <div className='search-result-name'
                        onClick={() => handleClick(searchItem.name)}
                        >
                            {searchItem.name}
                        </div> 
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default SearchBar;
