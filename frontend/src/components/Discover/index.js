import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import * as userActions from '../../store/users';
import * as trackActions from '../../store/track';
import DiscoverSlider from "../DiscoverSlider";
import './Discover.css'
import Playlist from "../Playlist";

const DiscoverPage = () => {
    
    const users = useSelector(userActions.getUsers);
    const tracks = useSelector(trackActions.getTracks);
    let sessionUser = useSelector(sessionActions.getSession);


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
                < Playlist tracks={tracks} users={users} sessionUser={sessionUser}/>

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