import './ProfileDropdown.css';

const ProfileDropdown = () => {
    return ( 
        <div className="profileDropdown">
            <a href="#"
            className='sessionMenuItem'
            >Profile</a>
            <a href="#"
            className='sessionMenuItem'
            >Likes</a>
            <a href="#"
            className='sessionMenuItem'
            >Following</a>
        </div>
     );
}
 
export default ProfileDropdown;