import { useSelector } from "react-redux";
import { getSession } from "../../store/session";


const ProfileOptions = () => {

    const user = useSelector(getSession);

    return (
        <div>
            <p>{user.username}</p>
        </div>
    )
}

export default ProfileOptions;