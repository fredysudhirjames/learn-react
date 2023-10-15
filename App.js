{
/*
HTML structure added to the root element.
<div id="parent">
	<div id="children">
		<h1>I'm a h1 tag</h1>
		<h2>I'm a h2 tag</h2>
	</div>
</div> */
}

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

const heading = React.createElement( 'h1', {id: 'heading', attribute:"abc"}, 'Hello world!!')
const root = ReactDOM.createRoot( document.getElementById( 'root' ) );

// Renders the object created using createElement into the root.
root.render(parent);
