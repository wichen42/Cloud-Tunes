import { useState } from "react";
import './ProfileNavItem.css';

const ProfileNavItem = (props) => {

    const [open, setOpen] = useState(false);

    return ( 
        <li className="profile-nav-item">
            <a href="#" 
            className="profie-icon-button"
            onClick={() => setOpen(!open)}
            >
                Username
            </a>
            {open && props.children}
        </li>
     );
}
 
export default ProfileNavItem;