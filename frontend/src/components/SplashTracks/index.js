import './SplashTracks.css';
import * as trackActions from '../../store/track';
import { useSelector } from 'react-redux';
import { shuffleArr } from '../../Util';
import SplashTrackItem from '../SplashTrackItem';

const SplashTracks = () => {
    
    const tracks = useSelector(trackActions.getTracks);
    const trackList = shuffleArr(tracks, 10);
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