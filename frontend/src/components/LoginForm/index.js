import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';
import * as usersActions from '../../store/users';
import SignupForm from '../SignupForm';
import WelcomeBack from "../WelcomeBackForm";


const LoginForm = ({open, onClose}) => {
    
    
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(usersActions.getUsers);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signupModal, setSignupModal] = useState(false);
    const [welcomeModal, setWelcomeModal] = useState(false);


    useEffect(() => {
        dispatch(usersActions.fetchUsers());
    }, [signupModal, username])

    if (!open) return null;
    if (sessionUser) return <Redirect to={"/"}/>;

    const usernames = [];

    for(let i = 0; i < users.length; i++) {
        usernames.push(users[i].username);
    }

    console.log(usernames);


    const handleLogin = (e) => {
        // console.log(username)
        e.preventDefault();
        if (usernames.includes(username)) {
            setWelcomeModal(true);
        } else {
            setSignupModal(true);
        }
    }

    // console.log(signupModal);

    const handleDemoLogin = (e) => {
        e.preventDefault();
        const demoUser = {
            username: "demolition",
            password: "password"
        }
        dispatch(sessionActions.setSession(demoUser));
    }

    const handleOverlayClick = (e) => {
        e.preventDefault();
        setUsername("");
        onClose();
        setSignupModal(false);
        setWelcomeModal(false);
    }


    return (
        
        <div className="modal-overlay" onClick={(e) => handleOverlayClick(e)}>
           <SignupForm signupOpen={signupModal} signupClose={() => setSignupModal(false)} username={username} />
           <WelcomeBack welcomeOpen={welcomeModal} welcomeClose={() => setWelcomeModal(false)} username={username}/>
           <div className="modal-container" onClick={(e) => {e.stopPropagation()}}>
                <div className="close-btn-container">
                    <p className="close-btn"
                        onClick={(e) => handleOverlayClick(e)}
                        >X
                    </p>
                </div>
                <div className="modal-links">
    
                    <div>
                        <a href="https://linkedin.com/in/wchen42"
                        target={"_blank"}
                        >
                            <button className="linkedin-link">LinkedIn</button>
                        </a>
                    </div>

                    <div>
                        <a href="https://github.com/wichen42/Cloud-Tunes/wiki"
                        target={"_blank"}
                        >
                            <button id="wiki-link">Project Wiki</button>
                        </a>
                    </div>

                    <div>
                        <a href="https://github.com/wichen42"
                        target="_blank"
                        >
                            <button className="github-link">Github</button>
                        </a>
                    </div>

                </div>

                <div className="login-sep">
                    <div className="login-border">
                        <div className="border-front"></div>
                        <div><p className="border-box-text">or</p></div>
                        <div className="border-back"></div> 
                    </div>
   
                </div>

                <div className="login-form">

                    <div className="login-form-input">
                        <form className="login-form">

                                <input type="text"
                                className="username-input"
                                value={username}
                                placeholder="Please enter your username"
                                onChange={e => setUsername(e.target.value)}
                                />

                                <button type="submit" className="login-btn" onClick={(e) => handleLogin(e)}>Login</button>

                                <button type="submit" className="demo-btn" onClick={(e) => handleDemoLogin(e)}>Demo User</button>
    
                        </form>   
                    </div>
                </div>
                <div className="session-text">
                    <p>                            
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aperiam iusto accusantium consequuntur amet rem culpa. Eligendi placeat consectetur laudantium assumenda ab voluptate, perferendis nisi porro deleniti accusantium, dolorem aliquid.
                    </p>
                </div>
            </div>
        </div>

    )
}

export default LoginForm;