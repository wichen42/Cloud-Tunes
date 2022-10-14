import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';

const DiscoverPage = () => {
    
    const dispatch = useDispatch();
    let sessionUser = useSelector(sessionActions.getSession);
    
    if(!sessionUser) return <Redirect to='/' />;
    
    return (
        <div>
            <p>Discover Page</p>
        </div>
    )
}

export default DiscoverPage;