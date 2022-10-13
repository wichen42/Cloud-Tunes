import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as usersActions from '../../store/users';
import * as sessionActions from '../../store/session';

const SignupWithUsername = ({swuOpen, swuClose}) => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState("");
    const [password, setPassword] = useState("");

    if (!swuOpen) return null;


    const handleClick = (e) => {
        e.preventDefault();
        const user = {username: username, password: password};
        dispatch(sessionActions.signup(user))
        .catch(async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if, e.g., server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          });

    }

    const handleOverlayClick = (e) => {
        e.preventDefault();
        swuClose();
    }

    const handleCloseButton = (e) => {
        e.preventDefault();
        swuClose();
    }

    function onChange(value) {
    }

    return (
        <div className="smodal-overlay" onClick={(e) => handleOverlayClick(e)} 
        >
            <div className="smodal-container" onClick={(e) => {e.stopPropagation()}}>
                <div className="sclose-btn-container">
                    <p className="sclose-btn" onClick={ (e) => handleCloseButton(e)}>X</p>
                </div>
                <div className='signup-text'>
                    <p>Create your CloudTunes account</p>
                </div>
                <div className='username-btn-container'>
                    <label>Enter Username</label>
                    <input type="text"
                    className="swu-username-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='password-container'>
                    <label className='password-label'>
                    Choose a password
                    <br />
                    <input className='password-input' 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    </label>

                    <div className='signup-error-container'>
                        {errors.length > 0 && (
                            <div className='signup-errors'>
                                {errors.map((error, i) => (
                                    <li key={i}>{error}</li>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className='captcha-container'>
                    <div className='captcha'>
                        <ReCAPTCHA
                            sitekey="6LfZ3XMiAAAAANnsPwQMQus6TW7jFrdADARj3JfI"
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className='signup-button-container'>
                    <div className='signup-form-button'
                    onClick={(e) => handleClick(e)}
                    >Create Account</div>
                </div>
                <div className='signup-filler-text'>
                    Are you trying to sign in?
                    <br />
                    The username you entered was not found.
                    <br />
                    Double-check your credentials.
                </div>
            </div>
        </div>
    )
}

export default SignupWithUsername;
