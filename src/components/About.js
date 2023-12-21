import User from "./User"
import UserClass from "./UserClass"

import React, { Component } from 'react'

class About extends Component {
  render() {
	return (
		<div className="wrapper">
			<h1>About page</h1>

			<UserClass name={"Company name"} location={"Bangalore"}/>
		</div>
	)
  }
}

export default About
