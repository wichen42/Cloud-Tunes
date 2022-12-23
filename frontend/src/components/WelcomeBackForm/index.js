import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './WelcomeBackForm.css';
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';

const WelcomeBack = ({welcomeOpen, welcomeClose, username}) => {

    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [hint, setHint] = useState(false);

    if (!welcomeOpen) return null;

    const handleShowPassword = (e) => {

        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }   
    }

    const handleClose = (e) => {
        e.preventDefault();
        welcomeClose();
    }

    const handleClick = (e) => {
        e.preventDefault();
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
          dispatch(sessionActions.getSession());
          <Redirect to="/discover" />
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
                        <input type={showPassword ? 'password' : 'text'}
                        className='welcome-password' 
                        placeholder='Your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="wpassword-eye"
                            onClick={(e) => handleShowPassword(e)}
                        ></div>
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
                            Login
                        </button>
                    </div>
                </div>

                <div className='welcome-end-text'
                onMouseEnter={() => setHint(true)}
                onMouseLeave={() => setHint(false)}
                >
                    Don't know your password?
                    {hint && (
                        <div className='password-hint'>It's probably "password"</div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default WelcomeBack;