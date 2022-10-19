import './OptionsDropdown.css';

const OptionsDropdown = () => {

    // TODO: Link signout functionality

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
            >Signout</a>
        </div>
     );
}
 
export default OptionsDropdown;