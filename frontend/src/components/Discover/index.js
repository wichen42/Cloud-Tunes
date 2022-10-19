import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Discover.css'

const DiscoverPage = () => {
    
    const dispatch = useDispatch();
    let sessionUser = useSelector(sessionActions.getSession);

    if(!sessionUser) return <Redirect to='/' />;
    
    return (
        <div className="discover-container">
            <div>
                <h1>Discover Page</h1>

            </div>

        </div>
    )
}

export default DiscoverPage;