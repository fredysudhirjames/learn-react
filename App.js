import React from "react";
import ReactDOM from "react-dom/client";
import logo from "./assets/react-logo.svg";
import {FaUserLarge} from "react-icons/fa6"
import data from './data.json'

const Header = () => {
	return (
		<div className="header">
			<div className="logo-container">
				<img src="https://i.pinimg.com/originals/34/0c/6a/340c6add7519212185a08d4205eb1965.png" className="logo"/>
			</div>
			<div className="nav-items">
				<ul>
					<li>Home</li>
					<li>About Us</li>
					<li>Contact Us</li>
					<li>Cart</li>
				</ul>
			</div>
		</div>
	)
}

const RestoCard = (props) => {
	const { resData } = props
	const { name, cloudinaryImageId, cuisines, avgRating, sla, costForTwo } = resData?.info
	return (
		<div className="res-card">
			<img
				className="res-card__img"
				src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+cloudinaryImageId}
			/>
			<h3 className="res-card__name">{name}</h3>
			<p className="res-card__cuisine">{cuisines.join(", ")}</p>
			<div>
				<span className="res-card__rating">{avgRating}</span>
				<span className="res-card_cost">{costForTwo}</span>
			</div>
			
			<p className="res-card__eta">{`${sla.deliveryTime} mins`}</p>
		</div>
	)
}

const Body = () => {
	return (
		<div className="body">
			<div className="search">Search</div>
			<div className="res-container">
				{
					data.map((restaurant) => (<RestoCard key={restaurant.info.id} resData={restaurant} />))
				}
			</div>
		</div>
	)
}

const AppLayout = () => {
	return (
		<div className="app">
			<Header />
			<Body />
		</div>
	)
}

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );

// Renders the object created using createElement into the root.
root.render(<AppLayout/>);
