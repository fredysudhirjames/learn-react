import { useEffect, useState } from "react";
import { RES_MENU_API } from "./constants";

export const useRestaurantMenu = (restaurantId) => {
	const [resInfo, setResInfo] = useState(null)
	
	useEffect(() => {
		fetchResInfo()
	})

	const fetchResInfo = async () => {
		const data = await fetch( RES_MENU_API + restaurantId)
		const json = await data.json()
		setResInfo(json.data)
	}

	return resInfo
}
