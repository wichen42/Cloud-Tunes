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
        setTrackList([
            tracks[1], tracks[7], tracks[15], tracks[21], tracks[8], 
            tracks[30], tracks[66], tracks[76], tracks[99], tracks[102],  
        ])
    }, [tracks]);

    // const trackList = shuffleArr(tracks, 10);
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