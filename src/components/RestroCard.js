import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";
const RestoCard = (props) => {
    const { resData } = props;
    const {
        name,
        cloudinaryImageId,
        cuisines,
        avgRating,
        sla,
        costForTwo,
        id,
    } = resData?.info;
    return (
        <div className="res-card w-full bg-gray-100 hover:bg-gray-200 rounded overflow-hidden border border-gray-300 h-full flex flex-col">
            <figure className="res-card__figure relative pb-[62.5%] m-0">
                <img
                    className="res-card__img absolute w-full h-full object-cover"
                    src={CDN_URL + cloudinaryImageId}
                />
            </figure>
            <div className="py-2 px-3 space-y-2 flex flex-col flex-grow">
                <div className="space-y-2 flex-1">
                    <h3 className="res-card__name font-bold text-xl">{name}</h3>
                    <p className="res-card__cuisine font-semibold">
                        {cuisines.join(", ")}
                    </p>
                    <div className="flex space-x-2 divide-x-2 divide-gray-800">
                        <span className="res-card__rating">⭐ {avgRating}</span>
                        <span className="res-card_cost pl-2">{costForTwo}</span>
                    </div>
                </div>

                <p className="res-card__eta">{`${sla.deliveryTime} mins`}</p>
            </div>
        </div>
    );
};

// Higher order component.
// Takes in a component and returns a new component (a component is a function).
export const withOpenTag = (RestoCard) => {
	return ( props ) => {
		return(
			<div className='w-full relative overflow-hidden border border-transparent'>
				<label className='inline-flex text-xs text-white font-medium bg-teal-500 px-10 py-1 absolute z-1 -left-7 top-3 -rotate-45'>Open</label>
				<RestoCard {...props}/>
			</div>
		)
	}
}

export default RestoCard;
