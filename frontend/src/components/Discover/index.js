import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import * as userActions from '../../store/users';
import * as trackActions from '../../store/track';
import * as followActions from '../../store/follow';
import DiscoverSlider from "../DiscoverSlider";
import Playlist from "../Playlist";
import { useEffect, useState } from "react";
import csrfFetch from "../../store/csrf";
import './Discover.css'

const DiscoverPage = () => {
    
    const dispatch = useDispatch();
    const users = useSelector(userActions.getUsers);
    const tracks = useSelector(trackActions.getTracks);
    let sessionUser = useSelector(sessionActions.getSession);
    const [followList, setFollowList] = useState([]);
    const follows = useSelector(followActions.getFollows);

    console.log(follows);

    // useEffect(() => {
    //     const fetchFollows = async () => {
    //         const res = await csrfFetch('/api/follows')
    //         const data = await res.json();
    //         setFollowList(Object.values(data));
    //     }
    //     fetchFollows();
    // }, [])

    useEffect(() => {
        dispatch(followActions.fetchFollows());
    }, [])

    function shuffleArr(arr, num) {
        const res = [...arr].sort(() => 0.5 - Math.random());
        return res.slice(0, num);
    }

    const artistList = shuffleArr(users, 10);
    const demolitionTracks = tracks.filter(track => track.userId === 1);
    const biggieTracks = tracks.filter(track => track.userId === 17);

    if(!sessionUser) return <Redirect to='/' />;
    
    return (
        <div className="discover-container">
            <div className="discover-body">
                < DiscoverSlider title={"Discover Artists"} data={artistList}/>
                < DiscoverSlider title={"More from demolition"} data={biggieTracks}/>
                < DiscoverSlider title={"More from biggie"} data={demolitionTracks}/>
                < Playlist tracks={tracks} users={users} sessionUser={sessionUser} followList={follows}/>

                <div className="discover-playlist">

                </div>
            </div>

            <div className="discover-side-panel">
                <div className="side-panel-follow">
                    {/* Auto generate 3 users that are not followed here */}
                </div>

                <div className="side-panel-like">
                    {/* User's liked tracks show here */}
                </div>

                <div className="side-panel-music">
                    {/* Randomly selected track here */}
                </div>
            </div>

        </div>
    )
}

export default DiscoverPage;