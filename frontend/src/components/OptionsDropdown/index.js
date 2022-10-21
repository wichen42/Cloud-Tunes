import './OptionsDropdown.css';
import * as sessionActions from '../../store/session'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const OptionsDropdown = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSignout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        dispatch(sessionActions.getSession);
        history.push('/');
    }

    //TODO: Implement link to external urls

    return ( 
        <div className='options-dropdown'>
            <a href="#"
            className='sessionMenuItem'
            >About Us</a>
            <a href="#"
            className='sessionMenuItem'
            >Attributions</a>
            <a href="#"
            className='sessionMenuItem'
            >Github Wiki</a>
            <a href="#"
            className='sessionMenuItem'
            >Github</a>
            <a href="#"
            className='sessionMenuItem'
            >LinkedIn</a>
            <a href="#"
            className='sessionMenuItem'
            onClick={(e) => handleSignout(e)}
            >Signout</a>
        </div>
     );
}
 
export default OptionsDropdown;