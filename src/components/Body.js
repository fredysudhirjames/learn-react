import React from "react";
import RestoCard from "./RestroCard"
import data from '../utils/data.json'

// Debounce function.
const debounce = (func, delay) => {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => func(...args), delay)
	}
}

const Body = () => {
	const [searchInput, setSearchInput] = React.useState("");
	const [filteredRestaurants, setFilteredRestaurants] = React.useState(data);

	// Filter the restaurants list by the searched term. Search in Name or Cuisines.
	const searchRes = (searchTerm) => {
		const filteredRestaurants = data.filter(
			restau => restau.info.name.toLowerCase().includes(searchTerm.toLowerCase()) || restau.info.cuisines.some(cuisine => cuisine.toLowerCase().includes(searchTerm.toLowerCase()))
		)
		setFilteredRestaurants(filteredRestaurants)
	}

	// Search by debounce. useCallback hook is used to memoize the debounce
	const debouncedSearchRes = React.useCallback(debounce(searchRes, 500), []);

	// Handle the change in input text.
	const handleSearch = (e) => {
		setSearchInput(e.target.value);
		debouncedSearchRes(e.target.value)
	} 

	return (
		<div className="body">
			<div className="search">
				<input
					type="search"
					placeholder="Search by Name or Cuisine..."
					onChange={handleSearch}
					value={searchInput} />
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
