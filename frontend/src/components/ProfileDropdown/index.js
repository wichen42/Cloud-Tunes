import './ProfileDropdown.css';

const ProfileDropdown = () => {

    //TODO: Implement routing to other pages

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