import React from "react";
import UserContext from '../utils/UserContext';

class UserClass extends React.Component {
	// First constructor is loaded
	constructor(props) {
		super(props)

		this.state = {
			userInfo: {
				name: 'Wait for actual user',
				location: 'Earth'
			}
		}
	}

	// After the component is rendered or mounted in the BrowserRouter, then this is loaded
	async componentDidMount() {
		console.log('When the component is already mounted to the webpage')
		const data = await fetch( 'https://api.github.com/users/fredysj')
		const json = await data.json()

		this.setState({
			userInfo: json
		})

		this.timer = setInterval(() => {
			console.log('Set interval timer every 1 second')
		}, 1000)
	}

	componentDidUpdate() {
		console.log('Loaded after the component is updated')
	}

	componentWillUnmount() {
		console.log('Loaded when a component is unmounted from the page. ie, when a different page is visited')
		clearInterval(this.timer)
	}

	// Second render is loaded
	render() {
		const {name, location} = this.state.userInfo
		return (
			<div className="user-card">
				<UserContext.Consumer>
					{(data) => data.loggedInUser}
				</UserContext.Consumer>
				<h2>{name}</h2>
				<h3>Location: {location}</h3>
				<p>Contact: query@company.com</p>
			</div>
		)
	}
}

export default UserClass
