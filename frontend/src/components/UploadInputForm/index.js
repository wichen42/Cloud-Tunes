import { useContext, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SessionContext } from '../../Context/SessionContext';
import csrfFetch from '../../store/csrf';
import * as trackActions from '../../store/track';
import './UploadInputForm.css';

const UploadInputForm = ({track, close}) => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [desc, setDesc] = useState("");
    const {username, id} = useContext(SessionContext)
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const imageRef = useRef();

    const handleInput = (e) => {
        const file = e.currentTarget.files[0];
        setImage(file);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const trackObj = {title, username, genre, desc}
        
        /// create formData for track 
        const formData = new FormData();
        formData.append('track[title]', title);
        formData.append('track[username]', username);
        formData.append('track[genre]', genre);
        formData.append('track[description]', desc);
        formData.append('track[user_id]', id);
        formData.append('track[image]', image)
        if (track) {
            formData.append('track[track]', track);
        }
        // upload track to backend
        const res = await csrfFetch('api/tracks', {
            method: 'POST',
            body: formData
        });
        if (res.ok) {
            const message = await res.json();
            dispatch(trackActions.fetchTracks());
            setTitle("");
            setGenre("");
            setDesc("");
            setImage(null);
            close();
        }
        
    }
    
    const handleClick = (e) => {
        e.preventDefault();
        return close();
    }
    

    return ( 
        <div className='upload-input-form-container'>
            <div className='upload-form-header'>Track Details</div>
            <form 
            className='upload-input-form'
            onSubmit={(e) => handleSubmit(e)}
            >
                <label>Title:</label>
                <input type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                
                <label>Genre:</label>
                <input type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                />
    
                <label>Description:</label>
                <textarea 
                className='upload-description'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                ></textarea>
                
                <label>Track Image:</label>
                <input type="file" 
                className='upload-image'
                onChange={handleInput}
                ref={imageRef}
                />

                <div className='upload-buttons'>
                    <button
                    className='upload-cancel'
                    onClick={handleClick}
                    >Cancel</button>
                    <button 
                    type='submit'
                    className='upload-submit'
                    >Save</button>
                </div>

            </form>
        </div>

     );
}
 
export default UploadInputForm;