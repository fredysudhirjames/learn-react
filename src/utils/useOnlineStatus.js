import { useEffect, useState } from "react"

export const useOnlineStatus = () => {
	const [onlineStatus, setOnlineStatus] = useState(true)

	useEffect(()=> {
		window.addEventListener( "online", () => {
			console.log('Online status')
			setOnlineStatus(true)
		})
	
		window.addEventListener( "offline", () => {
			setOnlineStatus(false)
		})
	}, [])

	
	return onlineStatus
}
