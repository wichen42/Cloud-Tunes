import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUsers, getUser } from '../../store/users';
import UserProfileEdit from '../UserProfileEdit';
import { SessionContext } from '../../Context/SessionContext';
import * as trackActions from '../../store/track';
import './UserProfilePage.css';
import TrackDisplay from '../TrackDisplayBar';
import * as sessionActions from '../../store/session';
import * as likeActions from '../../store/like';
import * as userActions from '../../store/users';
import csrfFetch from '../../store/csrf';

const UserProfilePage = () => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const users = useSelector(userActions.getUsers);
    const [user, setUser] = useState({});
    const sessionUser = useContext(SessionContext)
    const [follow, setFollow] = useState('Follow');
    const [profileUrl, setPhotoUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [profileAbout, setProfileAbout] = useState('');
    const [edit, setEdit] = useState(false);
    const [track, setTrack] = useState(true);
    const allTracks = useSelector(trackActions.getTracks);
    const [playlist, setPlaylist] = useState(false);
    const userTracks = allTracks.filter((track) => track.userId === parseInt(id));
    const [openEdit, setOpenEdit] = useState(false);
    const [showTracks, setShowTracks] = useState(true);
    const [followList, setFollowList] = useState([]);
    const [followCount, setFollowCount] = useState();
    const likeList = useSelector(likeActions.getLikes);
    const [likeCount, setLikeCount] = useState();
    const [userList, setUserList] = useState([]);
    const trackItem = userTracks.map(track => <TrackDisplay key={track.id} track={track}/>)
    
    useEffect(() => {
        const fetchFollows = async () => {
            const res = await csrfFetch('/api/follows')
            const data = await res.json();
            setFollowList(Object.values(data));
        } 
        fetchFollows();

    }, [])

    useEffect(() => {
        setUserList(users);
    }, [users]);

    useEffect(() => {
        if (id) {
        const paramUser = userList.filter(function (el) {
            return el.id === parseInt(id);
        })
        setUser(paramUser[0])
        }
    }, [userList])

    useEffect(() => {
        if (user) {
            const userLikeList = likeList.filter(function (el) {
            return el.userId === user.id;
        });
        setLikeCount(userLikeList.length);
        }
    }, [likeList])

    useEffect(() => {
        if (user) {
            followList.forEach((follow) => {
            const followData = {followedId: id, followerId: sessionUser.id}
            if (Object.entries(follow).sort().toString() === Object.entries(followData).sort().toString()) {
                setFollow("Following");
                setFstyle(followingStyle)
            }
        });
        // filter out follow list for id in params
        const userFollowList = followList.filter(function (el) {
            return el.followedId === user.id;
        })
        setFollowCount(userFollowList.length);
        }
    }, [followList])


    useEffect(() => {
        if (user) {
            if (!user.bannerURL) {
                setBannerUrl('https://cloud-tunes-dev.s3.amazonaws.com/default-banner.jpg')
            } else {
                setBannerUrl(user.bannerURL);
            }
            if (!user.profileUrl) {
                setPhotoUrl('https://cloud-tunes-dev.s3.amazonaws.com/user-regular.svg');
            } else {
                setPhotoUrl(user.profileUrl);
            }
            if (!user.about) {
                setProfileAbout("Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum!");
            } else {
                setProfileAbout(user.about);
            }
        }
    }, [user])

    useEffect(() => {
        dispatch(fetchUsers);
    }, [id])
    
    const handleFollowStyle = async (e) => {
        e.preventDefault();
        const data = {follower_id: sessionUser.id, followed_id: id};
        if (follow === "Follow") {
            setFollow("Following");
            setFstyle(followingStyle);

            await csrfFetch(`/api/follows`, {
                method: "POST",
                body: JSON.stringify(data)
            });
        } else {
            setFollow("Follow");
            setFstyle(followStyle);

            await csrfFetch(`/api/follows/${id}`, {
                method: "DELETE"
            })
        }


    }
    // Styles

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

    // onClick Functions

    const handleProfileEdit = (e) => {
        e.preventDefault();
        if (user.id === sessionUser.id) {
            setTrack(false);
            setPlaylist(false);
            setEdit(true);
        } else {
        }
    }

    const handlePlaylist = (e) => {
        e.preventDefault();
        setTrack(false);
        setEdit(false);
        setPlaylist(true);
    }

    const handleTrack = (e) => {
        e.preventDefault(); 
        setEdit(false);
        setPlaylist(false);
        setTrack(true);
    }
    
    const handleOpenEdit = (e) => {
        e.preventDefault();
        setOpenEdit(!openEdit);
        setShowTracks(!showTracks);
    }

    
    if (user) {return(
        <div id="user-profile-container">
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
                            <button className='track-tab'
                            onClick={(e) => handleTrack(e)}
                            >Tracks</button>
                            <button className='profile-playlist'
                            onClick={(e) => handlePlaylist(e)}
                            >Playlist</button>

                            <button className='reposts-tab'>Reposts</button>
{/* 
                            {(sessionUser && (user.id === sessionUser.id)) && 
                            <button className='profile-edit'
                            onClick={(e) => handleProfileEdit(e)}
                            >Edit Profile</button>
                            } */}

                        </div>

                        <div className='banner-buttons'>
                            <div className='banner-station'>Station</div>
                            <div className='banner-follow'
                            style={fStyle}
                            onClick={e => handleFollowStyle(e)}
                            >{follow}</div>
                            <div className='banner-share'
                            onClick={(e) => handleOpenEdit(e)}>Edit</div>
                        </div>
                    </div>

                    <div className='content-container'>

                        <div className='profile-content'>
                            { openEdit && <UserProfileEdit />}
                            { showTracks && trackItem}
                        </div>

                        <div className='profile-about-container'>
                            <div className='profile-about-socials'>
                                <div className='profile-likes'>
                                    <div>Likes</div>
                                    <div>{likeCount}</div>
                                </div>
                                <div className='profile-follows'>
                                    <div>Followers</div>
                                    <div>{followCount}</div>
                                </div>
                                <div className='profile-tracks'>
                                    <div>Tracks</div>
                                    <div>{userTracks.length}</div>
                                </div>
                            </div>
                            <div className='profile-about'>
                                {profileAbout}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className='push'></div>
        </div>
    )} 
    }
    
    export default UserProfilePage;