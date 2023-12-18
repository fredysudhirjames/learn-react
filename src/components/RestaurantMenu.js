import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RES_MENU_API } from '../utils/constants';
import Shimmer from "./Shimmer";
import RestroMenuList from './RestroMenuList';

const RestaurantMenu = () => {
	const [resDetails, setResDetails ] = useState(null)

	// const params = useParams(); 
	const { resId } = useParams();

	useEffect(()=> {
		fetchData();
	}, [])

	const fetchData = async () => {
		const data = await fetch(RES_MENU_API + resId)
		const json = await data.json();
		setResDetails( json.data );
	}

	const resInfo = resDetails?.cards[0]?.card?.card?.info;
	const resMenuObj = resDetails?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

	if ( resDetails === null ) {
		return <Shimmer />
	}

	// The API contains a lot of data. So filtered out the menu items by category. A temp solution for now.
	const menuList = resMenuObj.filter( card =>
		(card.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" || card.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory")
	)

	return (
		<div className='res-menu wrapper'>
			<h1>{ resInfo.name }</h1>
			<p>{ resInfo.cuisines.join(", ") }</p>
			<p>{ resInfo.areaName + ', ' + resInfo.sla.lastMileTravelString }</p>
			<h2>Menu</h2>
			{
				menuList.map( listItem => <RestroMenuList details={listItem.card.card} />)
			}
		</div>
	)
}

export default RestaurantMenu
