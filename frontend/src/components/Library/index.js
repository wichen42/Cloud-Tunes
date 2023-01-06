import { useSelector } from 'react-redux';
import LibraryItem from '../../LibraryItem';
import * as trackActions from '../../store/track';
import * as userActions from '../../store/users';
import './Library.css';

const Library = () => {

    const tracks = useSelector(trackActions.getTracks);
    const users = useSelector(userActions.getUsers);

    return ( 
        <div className='library-container'>
            <div className='library-header'>
                All Tracks
            </div>
            <div className='library-track-container'>
                
                    {tracks.map(track => {
                        return <LibraryItem track={track} users={users}/>
                    })}
                
            </div>
        </div>
     );
}
 
export default Library;