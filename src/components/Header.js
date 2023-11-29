import { useState } from "react"
import { LOGO_URL } from "../utils/constants"
const Header = () => {
	const [userStatus, setUserStatus] = useState(false);
	return (
		<div className="header">
			<div className="logo-container">
				<img src={LOGO_URL} className="logo"/>
			</div>
			<div className="nav-items">
				<ul>
					<li>Home</li>
					<li>About Us</li>
					<li>Contact Us</li>
					<li>Cart</li>
					<button onClick={() => setUserStatus(!userStatus)}>{userStatus ? 'Logout' : 'Login'}</button>
				</ul>
			</div>
		</div>
	)
}

export default Header
