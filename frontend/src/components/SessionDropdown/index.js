import './SessionDropdown.css';
import * as sessionActions from '../../store/session';
import { useDispatch } from "react-redux";


const SessionDropdown = () => {

    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    }

    return(
        <div className="sessionDropdown">
            <a href="#"
            className="sessionMenuItem"
            onClick={(e) => handleLogout(e)}
            >Logout</a>
        </div>
    )
}

export default SessionDropdown;