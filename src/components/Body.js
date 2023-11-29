import {useState, useCallback, useEffect} from "react";
import RestoCard from "./RestroCard"
import Shimmer from "./Shimmer";
import { SWIGGY_API } from "../utils/constants";

// Debounce function.
const debounce = (func, delay) => {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => func(...args), delay)
	}
}

// Function to find the object by card id, to retrieve the restaurants list.
const findCardById = (cards, targetId) => {
	for ( const cardItem of cards ) {
		const card = cardItem.card.card;
		if ( card.id === targetId ) {
			return card;
		}
	}
	return null; // return null if the specified card object with ID is not found.
}

const Body = () => {
	const [searchInput, setSearchInput] = useState("");
	const [listOfRestaurants, setListOfRestaurants] = useState([]);
	// State to handle the restaurants filtering with search.
	const [filteredRestaurants, setFilteredRestaurants] = useState([]);
	// Extracting the desired card
	const targetCardId = "restaurant_grid_listing";

	// Filter the restaurants list by the searched term. Search in Name or Cuisines.
	const searchRes = (searchTerm) => {
		const filteredRestaurants = listOfRestaurants.filter(
			restau => restau.info.name.toLowerCase().includes(searchTerm.toLowerCase()) || restau.info.cuisines.some(cuisine => cuisine.toLowerCase().includes(searchTerm.toLowerCase()))
		)
		setFilteredRestaurants(filteredRestaurants)
	}

	// Search by debounce. useCallback hook is used to memoize the debounce
	const debouncedSearchRes = useCallback(debounce(searchRes, 500), []);

	// Handle the change in input text.
	const handleSearch = (e) => {
		setSearchInput(e.target.value);
		debouncedSearchRes(e.target.value)
	}

	useEffect( () => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const details = await fetch( SWIGGY_API )
		const json = await details.json();
		const cardsArray = await json.data.cards;
		const desiredCard = findCardById(cardsArray, targetCardId);
		// If the desired card with the restaurants if found, set the state variable.
		if ( desiredCard ) {
			const restauList = desiredCard.gridElements.infoWithStyle.restaurants;
			setListOfRestaurants(restauList)
			setFilteredRestaurants(restauList)
		}
	}

	// Renderin on based of condition - conditional rendering.
	if ( 0 === listOfRestaurants.length ) {
		return <Shimmer />
	}

	return (
		<div className="body">
			<div className="filter">
				<div className="search">
					<input
						type="search"
						placeholder="Search by Name or Cuisine..."
						onChange={handleSearch}
						value={searchInput} />
				</div>
				<button
					className="filter-btn"
					onClick={() => {
						const filteredList = listOfRestaurants.filter( res => res.info.avgRating > 4)
						setFilteredRestaurants(filteredList);
					}}
				>
					Top Rated Restaurants
				</button>
			</div>
			
			
			<div className="res-container">
				{
					filteredRestaurants.map((restaurant) => (<RestoCard key={restaurant.info.id} resData={restaurant} />))
				}
			</div>
		</div>
	)
}

export default Body
