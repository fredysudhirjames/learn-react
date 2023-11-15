import { CDN_URL } from "../utils/constants"
const RestoCard = (props) => {
	const { resData } = props
	const { name, cloudinaryImageId, cuisines, avgRating, sla, costForTwo } = resData?.info
	return (
		<div className="res-card">
			<figure className="res-card__figure">
				<img
					className="res-card__img"
					src={CDN_URL+cloudinaryImageId}
				/>
			</figure>
			
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

export default RestoCard
