import React from "react";
import ReactDOM from "react-dom/client";

// This creates an object which is then rendered in the root element.
const parent = React.createElement(
	"div",
	{ id: "parent" },
	React.createElement(
		"div",
		{id:'children'},
		[React.createElement( 'h1', {}, "I'm a h1 tag"), React.createElement( 'h2', {}, "I'm a h2 tag")]
	)
)
console.log(parent)

const heading = React.createElement( 'h1', {id: 'heading', attribute:"abc"}, 'Hello world!!')
const root = ReactDOM.createRoot( document.getElementById( 'root' ) );

// Renders the object created using createElement into the root.
root.render(parent);
