import { useState } from 'react';
import './UserProfileEdit.css'

const UserProfileEdit = () => { 

    const [about, setAbout] = useState("");
    const [location, setLocation] = useState("");


    return ( 
        <div className='profile-edit-form'>
            <form>
                <label>About:</label>
                <input type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                />

                <label>Location:</label>
                <input type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
            </form>
        </div>
     );
}
 
export default UserProfileEdit; 