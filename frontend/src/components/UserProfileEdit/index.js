import { useState } from 'react';
import './UserProfileEdit.css'

const UserProfileEdit = () => { 

    const [about, setAbout] = useState("");
    const [location, setLocation] = useState("");


    return ( 
        <div className='profile-edit-form-container'>
            <form
            className='profile-edit-form'
            >
                <div className='about-container'>
                    <label>About:</label>
                    <textarea className='about-text'></textarea>
                </div>

                <div className='location-container'>
                    <label>Location:</label>
                    <input type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div className='profile-image-container'>
                    <label>Profile Image:</label>
                    <input type="file" />
                </div>

                <div className='profile-banner-container'>
                    <label>Profile Banner:</label>
                    <input type="file" />
                </div>

                <div id='profile-edit-buttons-container'>
                    <button className='profile-edit-cancel'>Cancel</button>

                    <button className='profile-edit-submit'
                    type='submit'
                    >Save</button>
                </div>

            </form>
        </div>
     );
}
 
export default UserProfileEdit; 