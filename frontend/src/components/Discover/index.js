import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Discover.css'

const DiscoverPage = ({tracks}) => {
    
    const dispatch = useDispatch();
    let sessionUser = useSelector(sessionActions.getSession);
    console.log(tracks);

    if(!sessionUser) return <Redirect to='/' />;
    
    return (
        <div className="discover-container">
            <div>
                <h1>Discover Page</h1>
                <ul>
                    {tracks.map(track => {
                        return (
                            <li key={track.id}>
                                <h2>{track.title}</h2>
                            </li>
                        )
                    })}
                </ul>
            </div>

        </div>
    )
}

export default DiscoverPage;