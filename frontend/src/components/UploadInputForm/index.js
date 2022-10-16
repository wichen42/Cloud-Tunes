import { useContext, useState } from 'react';
import { SessionContext } from '../../Context/SessionContext';
import './UploadInputForm.css';

const UploadInputForm = ({track, close}) => {

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [desc, setDesc] = useState("");
    const sessionUser = useContext(SessionContext)

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const trackObj = {title, genre, desc}
        // console.log(track);
        
        const formData = new FormData();
        formData.append('track[title]', title);
        formData.append('track[username]', sessionUser.username);
        formData.append('track[genre]', genre);
        formData.append('track[description]', desc);
        if (track) {
            formData.append('track[track]')
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