import './SignupForm.css'
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as usersActions from '../../store/users';
import * as sessionActions from '../../store/session';
import { Link, useHistory } from 'react-router-dom';

const SignupForm = ({signupOpen, signupClose, username}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState("");
    const [password, setPassword] = useState("");
    const [submitClicked, setSubmitClicked] = useState(false);
    const [users, setUsers] = useState({});
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        dispatch(usersActions.fetchUsers());

    }, [submitClicked])

    if (!signupOpen) return null;


    const handleClick = (e) => {
        e.preventDefault();
        const user = {username: username, password: password};
        setSubmitClicked(true);
        dispatch(sessionActions.signup(user))
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

          
          history.push('/discover');
    }

    console.log("username " + username);

    const handleOverlayClick = (e) => {
        e.preventDefault();
        signupClose();
    }

    const handleCloseButton = (e) => {
        e.preventDefault();
        signupClose();
    }

    function onChange(value) {
    }

    const handleShowPassword = (e) => {
        e.preventDefault();
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }   
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
                    <button className='username-signup-input'
                    onClick={signupClose}
                    >
                        {username}
                    </button>
                </div>
                <div className='password-container'>
                    <label className='password-label'>
                    Choose a password
                    <br />
                    <input className='password-input' 
                    type={showPassword ? 'password' : 'text'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    </label>
                    <div className="password-eye"
                    onClick={(e) => handleShowPassword(e)}
                    ></div>

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
                    ><Link className='signup-link' to='/discover'>Create Account</Link></div>
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

export default SignupForm;