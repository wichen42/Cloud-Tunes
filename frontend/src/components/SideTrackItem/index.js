import './SideTrackItem.css';

const SideTrackItem = ({track}) => {  

    return ( 
        <div className='side-track-container'>
            <div className='side-track-image'>
                <img src={track.imageUrl} className='side-track-image-source'/>
            </div>
            <div className='side-track-details'>
                <div className='side-track-username'>{track.username}</div>
                <div className='side-track-title'>{track.title}</div>
            </div>
        </div>
     );
}
 
export default SideTrackItem;  