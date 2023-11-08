import React from "react";
import ReactDOM from "react-dom/client";
import logo from "./assets/react-logo.svg";
import {FaUserLarge} from "react-icons/fa6"

// This creates an object which is then rendered in the root element.
// const parent = React.createElement(
// 	"div",
// 	{ class: "title" },
// 	[React.createElement( 'h1', {}, "I'm a h1 tag"), React.createElement( 'h2', {}, "I'm a h2 tag"), React.createElement( 'h3', {}, "I'm a h3 tag")]
// )

// const jsxElem = (
// 	<div className="title">
// 		<h1>H1 title</h1>
// 		<h2>I am a h2 tag</h2>
// 		<h3>H3 heading</h3>
// 	</div>
// )

// const TitleComponent = () => (
// 	<div className="title">
//  		<h1>H1 title</h1>
// 		<h2>I am a h2 tag</h2>
//  		<h3>H3 heading</h3>
// 		<img src={logo} />
//  	</div>
// )

const HeaderComponent = () => (
	<div className="header">
		<div className="wrapper header__wrap">
			<img src={logo} alt="React" className="header__logo"/>
			<input type="text" className="header__search" placeholder="Search..."/>
			<FaUserLarge className="header__user-icon"/>
		</div>
	</div>
)

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );

// Renders the object created using createElement into the root.
root.render(<HeaderComponent/>);
