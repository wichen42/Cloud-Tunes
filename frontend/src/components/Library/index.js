import { useSelector } from 'react-redux';
import * as trackActions from '../../store/track';
import './Library.css';

const Library = () => {

    const tracks = useSelector(trackActions.getTracks);

    return ( 
        <div className='library-container'>
                <h1>All Tracks</h1>
            <div>
                <ul>
                    {tracks.map(track => {
                       return(
                        <li key={track.id}
                        className="track-item"
                        >
                            <div className='track-detail-container'>
                                <div>Title:</div>
                                <div>{track.title}</div>
                            </div>
                            <div className='track-detail-container'>
                                <div>Username:</div>
                                <div>{track.username}</div>
                            </div>
                            <div className='track-detail-container'>
                                <div>Genre:</div>
                                <div>{track.genre}</div>
                            </div>
                            <div className='track-detail-container'>
                                <div>Description</div>
                                <div>{track.description}</div>
                            </div>
                            <div className='track-detail-container'>
                                <div>URL:</div>
                                <div>{track.trackUrl}</div>
                            </div>
                        </li>
                       ) 
                    })}
                </ul>
            </div>
        </div>
     );
}
 
export default Library;