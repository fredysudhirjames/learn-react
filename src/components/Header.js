import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import UserContext from '../utils/UserContext';

const Header = () => {
    const [userStatus, setUserStatus] = useState(false);
    const checkOnlineStatus = useOnlineStatus();
	const userData = useContext(UserContext)

    return (
        <div className="header shadow py-2.5 px-5 flex justify-between items-center">
            <div className="logo-container max-w-[100px]">
                <img src={LOGO_URL} className="logo" />
            </div>
            <div className="nav-items">
                <ul className="flex gap-x-5 list-none text-xl">
                    <li>Online status: {checkOnlineStatus ? "✅" : "🔴"}</li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact Us</Link>
                    </li>
                    <li>
                        <Link to="/grocery">Grocery</Link>
                    </li>
                    <li>Cart</li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
					<li className='font-bold'>
						{userData.loggedInUser}
					</li>
                    {/* <button onClick={() => setUserStatus(!userStatus)}>{userStatus ? 'Logout' : 'Login'}</button> */}
                </ul>
            </div>
        </div>
    );
};

export default Header;
