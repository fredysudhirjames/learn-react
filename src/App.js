import React, { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
// import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Login from "./components/Login";
import UserContext from './utils/UserContext';
// import Grocery from "./components/Grocery";

const Grocery = lazy(() => import("./components/Grocery"));

const About = lazy( () => import( "./components/About" ));

const AppLayout = () => {
	const [userName, setUserName] = useState();

	// authentication. To show how the context data is updated.
	useEffect( () => {
		const data = {
			name: 'Fredy'
		}
		setTimeout(() => {
			setUserName( data.name );
		}, 1000);
	}, [])

    return (
		<UserContext.Provider value={ { loggedInUser: userName, setUserName }}>
			<div className="app">
				<Header />
				<Outlet />
			</div>
		</UserContext.Provider>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: (
					<Suspense>
						<About />
					</Suspense>
				),
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu />,
            },
            {
                path: "/grocery",
                element: (
                    <Suspense fallback={<h1>Fallback Loading!!</h1>}>
                        <Grocery />
                    </Suspense>
                ),
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// Renders the object created using createElement into the root.
root.render(<RouterProvider router={appRouter} />);
