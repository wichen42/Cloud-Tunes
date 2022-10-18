import { useContext, useRef, useState } from 'react';
import { SessionContext } from '../../Context/SessionContext';
import csrfFetch from '../../store/csrf';
import './UserProfileEdit.css'

const UserProfileEdit = () => { 

    const [about, setAbout] = useState("");
    const [location, setLocation] = useState("");
    const sessionUser = useContext(SessionContext);
    const [profileImage, setProfileImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [profileUrl, setProfileUrl] = useState(null);
    const [bannerUrl, setBannerUrl] = useState(null);
    const imageRef = useRef();
    const bannerRef = useRef();

    console.log(sessionUser);

    const handleProfileImage = (e) => {
        const iconFile = e.currentTarget.files[0];
        setProfileImage(iconFile);
    }

    const handleBannerImage = (e) => {
        const bannerFile = e.currentTarget.files[0];
        setBannerImage(bannerFile);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // user info update
        const update = {about, location}

        const res = await csrfFetch(`/api/users/${sessionUser.id}`, {
            method: "PATCH",
            body: JSON.stringify(update)
        });

        const data = await res.json();
        console.log(data);

        // user profile and banner update

        const profileData = new FormData();
        const bannerData = new FormData();

        if (profileImage) {
            profileData.append('user[image]', profileImage);
        }

        if (bannerImage) {
            bannerData.append('user[banner]', bannerImage);
        }

        const profileRes = await csrfFetch(`/api/users/${sessionUser.id}`, {
            method: "PATCH",
            body: profileData
        })
        if (profileRes.ok) {
            const profileResData = await profileRes.json();
            console.log(profileResData.message);
            setProfileImage(null);
            setProfileUrl(null);
        }

        const bannerRes = await csrfFetch(`/api/users/${sessionUser.id}`, {
            method: "PATCH",
            body: bannerData
        })
        if (bannerRes.ok) {
            const bannerResData = await profileRes.json();
            console.log(bannerResData.message);
            setBannerImage(null);
            setProfileUrl(null);
        }

    }

    const profilePreview = profileUrl ? <img src={profileUrl}/> : null;
    const bannerPreview = bannerUrl ? <img src={bannerUrl}/> : null;

    console.log(profileImage);
    console.log(bannerImage);

    return ( 
        <div className='profile-edit-form-container'>
            <form
            className='profile-edit-form'
            onSubmit={(e) => handleSubmit(e)}
            >
                <div className='about-container'>
                    <label>About:</label>
                    <textarea className='about-text'
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
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
                    <input type="file" 
                    ref={imageRef}
                    onChange={handleProfileImage}
                    />
                    {profilePreview}
                </div>

                <div className='profile-banner-container'>
                    <label>Profile Banner:</label>
                    <input type="file" 
                    ref={bannerRef}
                    onChange={handleBannerImage}
                    />
                    {bannerPreview}
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