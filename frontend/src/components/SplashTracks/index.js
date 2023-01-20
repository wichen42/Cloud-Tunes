import './SplashTracks.css';
import * as trackActions from '../../store/track';
import { useSelector } from 'react-redux';
import { shuffleArr } from '../../Util';
import SplashTrackItem from '../SplashTrackItem';
import { useEffect } from 'react';
import { useState } from 'react';

const SplashTracks = () => {
    
    const tracks = useSelector(trackActions.getTracks);
    const [trackList, setTrackList] = useState([]);

    useEffect(() => {
        setTrackList(shuffleArr(tracks, 10));
    }, [tracks.length]);

    const trackItem = trackList.map(track => {
        return <SplashTrackItem track={track} />
    });

    return ( 
        <div className='splash-track-container'>
            {trackItem}
        </div>
     );
}
 
export default SplashTracks;