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
        // dispatch(sessionActions.getSession);
        history.push('/');
    }

    //TODO: Implement link to external urls

    return ( 
        <div className='options-dropdown'>
            <a href="https://wilsonchen.dev/"
            target="_blank"
            className='sessionMenuItem'
            >About Me</a>
            <a href="https://github.com/wichen42/Cloud-Tunes"
            target="_blank"
            className='sessionMenuItem'
            >Github</a>
            <a href="https://www.linkedin.com/in/wchen42"
            target="_blank"
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