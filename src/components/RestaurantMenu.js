import { useParams } from 'react-router-dom'
import Shimmer from "./Shimmer";
import RestroMenuList from './RestroMenuList';
import { useRestaurantMenu } from '../utils/useRestaurantMenu';
import {useState} from 'react';

const RestaurantMenu = () => {
	// const params = useParams(); 
	const { resId } = useParams();
	const [ activeAccordion, setActiveAccordion ] = useState( null ); // Manage open accordion
	
	// get restaurant details from the custom hook.
	const resDetails = useRestaurantMenu(resId)

	const resInfo = resDetails?.cards[2]?.card?.card?.info;
	const resMenuObj = resDetails?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
	
	if ( resDetails === null ) {
		return <Shimmer />
	}

	// The API contains a lot of data. So filtered out the menu items by category. A temp solution for now.
	const menuList = resMenuObj.filter( card =>
		(card.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" || card.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory")
	)

	return (
		<div className='res-menu wrapper my-6'>
			<h1 className='text-2xl font-bold'>{ resInfo.name }</h1>
			<p className='mt-1 text-indigo-700'>{ resInfo.cuisines.join(", ") }</p>
			<p className='mt-1.5 font-bold'>{ resInfo.areaName + ', ' + resInfo.sla.lastMileTravelString }</p>
			<h2 className='mt-3 text-lg uppercase italic text-center border-b pb-3'>Menu</h2>
			<div className='space-y-5 bg-gray-200 mt-5'>
			{
				menuList.map( listItem => {
					const menuListKey = `menu-${listItem.card.card.title.toLowerCase().replace( /\s+/g, '-' )}`;
					return <RestroMenuList key={ menuListKey } details={ listItem.card.card } openedAccordion={activeAccordion} setOpenedAccordion={setActiveAccordion} />
 				} )
			}
			</div>
		</div>
	)
}

export default RestaurantMenu
