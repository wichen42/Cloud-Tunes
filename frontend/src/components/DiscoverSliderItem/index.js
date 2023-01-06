import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../store/users';
import * as trackActions from '../../store/track';
import * as playListActions from '../../store/playlist';
import './DiscoverSliderItem.css';
import { useHistory } from 'react-router-dom';

const DiscoverSliderItem = ({id, imageSource, title, data}) => {
    
    const dispatch = useDispatch();
    const users = useSelector(userActions.getUsers);
    const tracks = useSelector(trackActions.getTracks);
    const history = useHistory();
    const [showButton, setShowButton] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        if (data[0].title) {
            // console.log("Tracks");
            const user = users.filter(function (el) {
                return el.username === data[0].username;
            });
            history.push(`/users/${user[0].id}`);
        } else {
            // console.log(data);
            const user = users.filter(function (el) {
                return el.username === title;
            });
            history.push(`/users/${user[0].id}`);
        }
    }

    const handlePlay = (e) => {
        e.preventDefault();
        const song = tracks.filter(function (el) {
            return el.id === id;
        });
        dispatch(playListActions.addSong(song[0]));
    }

    const handleImageClick = (e) => {
        e.preventDefault();
        const user = users.filter(function (el) {
            return el.username === title;
        });
        history.push(`/users/${user[0].id}`);
    }

    return ( 
        <div 
        className='discover-slider-item'
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
        >
            {(showButton && data[0].title) &&
            <div className='slider-hover-item'
            onClick={(e) => handlePlay(e)}
            ></div>}

            <img src={imageSource}
            onClick={(e) => handleImageClick(e)}
            className='discover-slider-item-img' 
            />
            <div className='discover-slider-item-title'
            onClick={(e) => handleClick(e)}
            >{title}</div>
        </div>
     );
}
 
export default DiscoverSliderItem;