import { useState, useCallback, useEffect, useContext } from "react";
import RestoCard, { withOpenTag } from "./RestroCard";
import Shimmer from "./Shimmer";
import { SWIGGY_API } from "../utils/constants";
import { Link } from "react-router-dom";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import UserContext from '../utils/UserContext';

// Debounce function.
const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

// Function to find the object by card id, to retrieve the restaurants list.
const findCardById = (cards, targetId) => {
    for (const cardItem of cards) {
        const card = cardItem.card.card;
        if (card.id === targetId) {
            return card;
        }
    }
    return null; // return null if the specified card object with ID is not found.
};

const Body = () => {
	const { loggedInUser, setUserName } = useContext( UserContext );
    const [searchInput, setSearchInput] = useState("");
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    // State to handle the restaurants filtering with search.
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    // Extracting the desired card
    const targetCardId = "restaurant_grid_listing";

    const checkOnlineStatus = useOnlineStatus();

    // Filter the restaurants list by the searched term. Search in Name or Cuisines.
    const searchRes = (searchTerm) => {
        const filteredRestaurants = listOfRestaurants.filter((restau) =>
            restau.info.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRestaurants(filteredRestaurants);
    };

    // Search by debounce. useCallback hook is used to memoize the debounce
    const debouncedSearchRes = useCallback(debounce(searchRes, 500), []);

    // Handle the change in input text.
    const handleSearch = (e) => {
        setSearchInput(e.target.value);
        debouncedSearchRes(e.target.value);
    };

	const RestoCardWithTag = withOpenTag( RestoCard );

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const details = await fetch(SWIGGY_API);
        const json = await details.json();
        const cardsArray = await json.data.cards;
        const desiredCard = findCardById(cardsArray, targetCardId);
        // If the desired card with the restaurants if found, set the state variable.
        if (desiredCard) {
            const restauList =
                desiredCard.gridElements.infoWithStyle.restaurants;
            setListOfRestaurants(restauList);
            setFilteredRestaurants(restauList);
        }
    };

    // Renderin on based of condition - conditional rendering.
    if (0 === listOfRestaurants.length) {
        return <Shimmer />;
    }

    if (checkOnlineStatus === false) {
        return (
            <h1>
                Looks like you are offline. Check you internet connection!!!
            </h1>
        );
    }	

    return (
        <div className="wrapper m-5">
            <div className="filter flex justify-between">
                <div className="search border-gray-800">
                    <input
                        type="search"
                        placeholder="Search by Name or Cuisine..."
                        onChange={handleSearch}
                        value={searchInput}
                        className="w-full max-w-md py-2 px-3.5 border border-gray-700"
                    />
                </div>
                <button
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-200 rounded-md"
                    onClick={() => {
                        const filteredList = listOfRestaurants.filter(
                            (res) => res.info.avgRating > 4
                        );
                        setFilteredRestaurants(filteredList);
                    }}
                >
                    Top Rated Restaurants
                </button>
				<div>
					<label>Username: </label>
					<input type='text' value={ loggedInUser } onChange={(e) => setUserName(e.target.value)} className='border p-1' />
				</div>
            </div>

            <div className="res-container grid grid-cols-5 gap-x-5 gap-y-10 mt-5">
                {filteredRestaurants.map((restaurant) => (
                    <Link
                        to={"/restaurant/" + restaurant.info.id}
                        className="flex"
                    >
						{ restaurant.info.isOpen ? <RestoCardWithTag key={ restaurant.info.id } resData={ restaurant } /> : <RestoCard key={ restaurant.info.id } resData={ restaurant }
						/> }
                        
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Body;
