import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as likeActions from '../../store/like';
import * as sessionActions from '../../store/session';
import * as trackActions from '../../store/track';
import LikesPageItem from '../LikesPageItem';
import './LikesPage.css';

const LikesPage = () => {

    const likeList = useSelector(likeActions.getLikes);
    const trackList = useSelector(trackActions.getTracks);
    const sessionUser = useSelector(sessionActions.getSession);
    const [likes, setLikes] = useState([]);
    const [tracks, setTracks] = useState([]);
    
    useEffect(() => {
        const likeData = likeList.filter(function (el) {
            return el.userId === sessionUser.id;
        });
        setLikes(likeData);
    }, []);

    const likeItem = likeList.map((like) => <LikesPageItem key={like.id} like={like} />)

    return ( 
        <div className='likes-page-container'>
            <div className='likes-page-header'>
                Hear the tracks you&#39;ve liked: 
            </div>

            <div className='likes-page-body'>
                {likeItem}
            </div>
        </div>
     );
}
 
export default LikesPage;