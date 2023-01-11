import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import * as userActions from '../../store/users';
import * as trackActions from '../../store/track';
import * as followActions from '../../store/follow';
import * as likeActions from '../../store/like';
import DiscoverSlider from "../DiscoverSlider";
import Playlist from "../Playlist";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Discover.css'
import FollowUserItem from "../FollowUserItem";
import SideTrackItem from "../SideTrackItem";

const DiscoverPage = () => {
    
    const dispatch = useDispatch();
    const follows = useSelector(followActions.getFollows);
    const users = useSelector(userActions.getUsers);
    const tracks = useSelector(trackActions.getTracks);
    const sessionUser = useSelector(sessionActions.getSession);
    const likeList = useSelector(likeActions.getLikes);
    const [refresh, setRefresh] = useState(0);
    const [artistFollow, setArtistFollow] = useState([]);
    const [likes, setLikes] = useState([]);
    const [userList, setUserList] = useState([]);
    const [sideTracks, setSideTracks] = useState([]);

    const history = useHistory();
    
    function shuffleArr(arr, num) {
        const res = [...arr].sort(() => 0.5 - Math.random());
        return res.slice(0, num);
    };

    useEffect(() => {
        dispatch(userActions.fetchUsers());
    }, []);

    useEffect(() => {
        setUserList(shuffleArr(users, 10));
        setArtistFollow(shuffleArr(users, 3))
    }, [users]);

    useEffect(() => {
        setSideTracks(shuffleArr(tracks, 3));
    }, [tracks]);

    useEffect(() => {
        const likeData = likeList.filter(function (el) {
            if (sessionUser) return el.userId === sessionUser.id;
        });
        setLikes(likeData);
    }, [likeList]);
    
    if (!sessionUser) return <Redirect to={'/'} />;

    const artistList = shuffleArr(users, 10);
    const demolitionTracks = tracks.filter(track => track.userId === 1);
    const biggieTracks = tracks.filter(track => track.userId === 2);
    const sideTrackItem = sideTracks.map(track => {
        return <SideTrackItem track={track} key={track.id}/>
    })

    const followArtistList = artistFollow.map(artist => {
        return <FollowUserItem key={artist.id} artist={artist} tracks={tracks} follows={follows} users={users}/>
    })

    
    const handleRefresh = (e) => {
        e.preventDefault();
        setRefresh(val => val + 1);
        setArtistFollow(shuffleArr(users, 3));
    }

    const handleViewAll = (e) => {
        e.preventDefault();
        history.push('/you/likes');
    }

    return (
        <div className="discover-container">
            <div className="discover-body">
                < DiscoverSlider title={"Discover Artists"} data={userList}/>
                < DiscoverSlider title={"More from biggie"} data={biggieTracks}/>
                < DiscoverSlider title={"More from demolition"} data={demolitionTracks}/>
                < Playlist tracks={tracks} users={users} sessionUser={sessionUser} followList={follows}/>

                <div className="discover-playlist">

                </div>
            </div>

            <div className="discover-side-panel">
                <div className="side-panel-follow">
                    {/* Auto generate 3 users that are not followed here */}
                    <div className="side-panel-follow-header">
                        <div className="side-panel-follow-text1">
                            <FontAwesomeIcon icon="fa-solid fa-users" /> Artists you should follow
                        </div>
                        <div className="side-panel-follow-text2"
                        onClick={(e) => handleRefresh(e)}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-rotate-right" /> Refresh
                        </div>
                    </div>
                    <div className="side-panel-follow-body">
                        {followArtistList}
                    </div>
                </div>

                <div className="side-panel-like">
                    {/* User's liked tracks show here */}
                    <div className="side-panel-likes-header">
                        <div className="side-panel-likes-heart">
                            <FontAwesomeIcon icon="fa-solid fa-heart" /> {likes.length} Likes
                        </div>
                        <div className="view-likes"
                        onClick={(e) => handleViewAll(e)}
                        >
                            View All
                        </div>
                    </div>

                </div>

                <div className="side-panel-music">
                    {/* Randomly selected track here */}
                    <div className="side-panel-tracks-header">
                        <div className="side-panel-music">
                            <FontAwesomeIcon icon="fa-solid fa-music" /> Tracks you might like
                        </div>
                    </div>

                    <div className="side-track-body">
                        {sideTrackItem}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DiscoverPage;