import { useState } from "react"
import { Link } from "react-router-dom";
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
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about">About Us</Link>
					</li>
					<li>
						<Link to="/contact">Contact Us</Link>
					</li>
					<li>Cart</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
					{/* <button onClick={() => setUserStatus(!userStatus)}>{userStatus ? 'Logout' : 'Login'}</button> */}
				</ul>
			</div>
		</div>
	)
}

export default Header
