import React from 'react'

const DishDetails = ({dish}) => {
	const dishInfo = dish.card.info
	return (
		<li key={dishInfo.id}>
			<span>{dishInfo.name}</span>
			<span> - </span> 
			<span>Rs. {dishInfo.price / 100}</span>
		</li>
	)
}

const NestCats = ({cats, catTitle}) => {
	console.log("cats", cats)
	return (
		<div>
			<h3>{catTitle}</h3>
			{
				cats.map( singleCat => {
					return(
						<div>
							<h4>{singleCat.title}</h4>
							<ul>
								{singleCat.itemCards.map( catItem => <DishDetails dish={catItem} />)}
							</ul>
						</div>
					)
				})
			}
		</div>
	)
}



const RestroMenuList = ({details}) => {
	if ( details["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" ) {
		return (
			<NestCats cats={details.categories} catTitle={details.title} />
		)
	}
	return (
		<div>
			<h3>{details.title}</h3>
			<ul>
				{details.itemCards.map( itemCard => <DishDetails dish={itemCard} /> )}
			</ul>
		</div>
	)
}

export default RestroMenuList;
