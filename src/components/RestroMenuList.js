import React from 'react'
import { IoChevronUpSharp } from "react-icons/io5";
import DishCard from './DishCard';

const DishesListing = ( { dishesArray, isOpen, onClick }) => {
	return(
		<div className='bg-white p-4'>
			<div className='flex justify-between items-center' onClick={ onClick }>
				<h3 className='text-lg font-bold'>{ dishesArray.title } ({ dishesArray.itemCards.length })</h3>
				{isOpen.toString()}
				<IoChevronUpSharp size={24} className={`${isOpen ? 'rotate-0' : 'rotate-180'}`}/>
			</div>
			{
				isOpen &&
				<div>
					<ul className='space-y-2 divide-y-2'>
						{ dishesArray.itemCards.map( itemCard => <DishCard key={ itemCard.id } dish={ itemCard } /> ) }
					</ul>
				</div>
			}
		</div>
	)
}

const NestCats = ( { cats, catTitle, openedAccordion, setOpenedAccordion }) => {
	return (
		<div className='space-y-3 bg-white pt-5'>
			<h2 className='text-2xl'>{ catTitle }</h2>
			<div className='divide-y'>
				{
					cats.map( (singleCat, index) => {
						const componentKey = `${ singleCat.title.toLowerCase().replace( /\s+/g, '-' ) }-${ index }`
						return(
							<DishesListing
								key={ componentKey }
								dishesArray={ singleCat }
								isOpen={ openedAccordion === componentKey }
								onClick={ () => setOpenedAccordion( openedAccordion === componentKey ? null : componentKey ) }
							/>
						)
					})
				}
			</div>
		</div>
	)
}

const RestroMenuList = ( { details, openedAccordion, setOpenedAccordion }) => {

	if ( details["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" ) {
		return (
			<NestCats
				cats={details.categories}
				catTitle={details.title}
				openedAccordion={ openedAccordion }
				setOpenedAccordion={ setOpenedAccordion }
			/>
		)
	}

	const componentKey = details.title.toLowerCase().replace( /\s+/g, '-' )
	return (
		<DishesListing
			key={ componentKey }
			dishesArray={ details }
			isOpen={ openedAccordion === componentKey }
			onClick={ () => setOpenedAccordion( openedAccordion === componentKey ? null : componentKey ) }
		/>
	)
}

export default RestroMenuList;
