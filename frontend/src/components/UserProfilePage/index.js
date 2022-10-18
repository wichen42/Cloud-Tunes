import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUsers, getUser, getUsers } from '../../store/users';
import AudioPlayerBar from '../AudioPlayerBar';
import './UserProfilePage.css';

const UserProfilePage = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const user = useSelector(getUser(id));
    const [follow, setFollow] = useState('Follow');
    const [profileUrl, setPhotoUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    
    useEffect(() => {
        if (user) {
            setBannerUrl(user.bannerUrl);
            if (!user.imageUrl) setPhotoUrl('https://cloud-tunes-dev.s3.amazonaws.com/user-regular.svg');
        }
    }, [user])

    useEffect(() => {
        dispatch(fetchUsers);
    }, [id])
    
    const handleFollowStyle = (e) => {
        e.preventDefault();
        if (follow === "Follow") {
            setFollow("Following");
            setFstyle(followingStyle);
        } else {
            setFollow("Follow");
            setFstyle(followStyle);
        }
    }
    
    const followStyle = {
        height: "24px",
        width: "100px",
        color: "white",
        backgroundColor: "#FF5500",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center"
    }
    
    const followingStyle = {
        height: "24px",
        width: "100px",
        color: "#FF5500",
        backgroundColor: "#FFFFFF",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        border: "1px solid lightgray"
    }

    const profileBanner = {
        backgroundImage: `url(${bannerUrl})`
    }

    const profileImage = {
        backgroundImage: `url(${profileUrl})`
    }
    
    const [fStyle, setFstyle] = useState(followStyle)
    
    if (user) {return(
        <div className="user-profile-container">
            <div className="profile-page">
                <div className="profile-banner" style={profileBanner}>
                    <div className='banner-info'>
                        <div className='bio-image' style={profileImage}></div>
                        <div className='bio-details'>
                            <div className='profile-username'>
                                {user.username}
                            </div>
                            <div className='profile-location'>
                                {user.location? user.location : "No Set Location"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='profile-container'>

                    <div className='track-banner'>
                        <div className='banner-tabs'>
                            <button className='track-tab'>Tracks</button>
                            <button className='profile-playlist'>Playlist</button>
                            <button className='profile-edit'>Edit Profile</button>
                        </div>

                        <div className='banner-buttons'>
                            <div className='banner-station'>Station</div>
                            <div className='banner-follow'
                            style={fStyle}
                            onClick={e => handleFollowStyle(e)}
                            >{follow}</div>
                            <div className='banner-share'>Share</div>
                        </div>
                    </div>

                    <div className='content-container'>

                        <div className='profile-content'>
                            
                        </div>

                        <div className='profile-about'>

                        </div>

                    </div>

                </div>
            </div>
            <div className='push'></div>
        </div>
    )} 
    }
    
    export default UserProfilePage;