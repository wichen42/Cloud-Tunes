import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import * as userActions from '../store/users';
import './DiscoverSliderItem.css';
import { useHistory } from 'react-router-dom';

const DiscoverSliderItem = ({imageSource, title, data}) => {
    
    const users = useSelector(userActions.getUsers);
    const history = useHistory();
    const [showButton, setShowButton] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        if (data[0].title) {
            console.log("Tracks");
            console.log(title);
        } else {
            // console.log(data);
            const user = users.filter(function (el) {
                return el.username === title;
            });
            // console.log(user[0].id);
            history.push(`/users/${user[0].id}`);
        }
    }

    return ( 
        <div 
        className='discover-slider-item'
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
        >
            {showButton && 
            <div className='slider-hover-item'
            onClick={(e) => handleClick(e)}
            ><FontAwesomeIcon icon="fa-solid fa-circle-play" className='slider-play'/>
            </div>}

            <img src={imageSource} 
            className='discover-slider-item-img' 
            />
            <div className='discover-slider-item-title'>{title}</div>
        </div>
     );
}
 
export default DiscoverSliderItem;