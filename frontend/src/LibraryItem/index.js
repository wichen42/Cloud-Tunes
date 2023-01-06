const LibraryItem = ({track}) => {

    const handleUser = (e) => {
        e.preventDefault();
        console.log(track.username);
    }

    return(
        <div key={track.id}
        className="track-item"
        >
        <div className='track-item-image-container'>
            <img src={track.imageUrl} className='library-track-image'/>
        </div>
        <div className='track-detail-container'>
            <div>{track.title}</div>
        </div>
        <div className='track-detail-container'>
            <div className='library-track-username'
            onClick={(e) => handleUser(e)}
            >{track.username}</div>
        </div>
        </div>
       ) 
}
 
export default LibraryItem;