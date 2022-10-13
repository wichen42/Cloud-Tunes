import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './WelcomeBackForm.css';
import * as sessionActions from '../../store/session';

const WelcomeBack = ({welcomeOpen, welcomeClose, username}) => {

    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (!welcomeOpen) return null;


    const handleClose = (e) => {
        e.preventDefault();
        welcomeClose();
    }

    const handleClick = (e) => {
        const user = {username: username, password: password}
        dispatch(sessionActions.login(user))
        .catch(async (res) => {
            let data;
            try {
              data = await res.clone().json();
            } catch {
              data = await res.text();
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          });
    }

    const handleOverlayClose = (e) => {
        e.preventDefault();
        welcomeClose();
    }

    return (
        <div className='wmodal-overlay' onClick={(e) => handleClose(e)}>
            <div className='wmodal-container' onClick={(e) => e.stopPropagation()}>
                <div className='wclose-btn-container'>
                    <p className='wclose-btn' onClick={(e) => handleClose(e)}>X</p>
                </div>

                <div className='welcome-text-container'>
                    <div className='welcome-text'>
                        <p>Welcome back!</p>
                    </div>
                </div>

                <div className='winput-container'>

                    <div className='welcome-username-container'>
                        <input type="button" 
                        value={username}
                        onClick={handleOverlayClose}
                        />
                    </div>
    
                    <div className='welcome-password-container'>
                        <input type="password" 
                        className='welcome-password' 
                        placeholder='Your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className='welcome-error-container'>
                            {errors.length > 0 && (
                                <div className='signup-errors'>
                                    {errors.map((error, i) => (
                                        <li key={i}>{error}</li>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='welcome-submit-container'>
                        <button
                        onClick={(e) => handleClick(e)}
                        >
                            Create Account
                        </button>
                    </div>
                </div>

                <div className='welcome-end-text'>
                    Don't know your password?
                </div>

            </div>
        </div>
    )
}

export default WelcomeBack;