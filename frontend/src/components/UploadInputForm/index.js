import { useContext, useState } from 'react';
import { SessionContext } from '../../Context/SessionContext';
import csrfFetch from '../../store/csrf';
import './UploadInputForm.css';

const UploadInputForm = ({track, close}) => {

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [desc, setDesc] = useState("");
    const sessionUser = useContext(SessionContext)
    const username = sessionUser.username;

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const trackObj = {title, username, genre, desc}
        console.log(trackObj);
        
        /// create formData for track 
        const formData = new FormData();
        formData.append('track[title]', title);
        formData.append('track[username]', username);
        formData.append('track[genre]', genre);
        formData.append('track[description]', desc);
        if (track) {
            formData.append('track[track]', track);
        }
        console.log(formData);
        // upload track to backend
        const res = await csrfFetch('api/tracks', {
            method: 'POST',
            body: formData
        });
        if (res.ok) {
            const message = await res.json();
            console.log(message.message);
            setTitle("");
            setGenre("");
            setDesc("");
        }
        
    }
    
    const handleClick = (e) => {
        e.preventDefault();
        return close();
    }
    
    console.log(track);
    console.log(sessionUser.username);

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