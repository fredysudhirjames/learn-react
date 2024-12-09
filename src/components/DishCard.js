import React from 'react';
import { CDN_URL } from '../utils/constants';

export default DishCard = ( { dish } ) => {
	const dishInfo = dish.card.info
	const price = dishInfo.price || dishInfo.defaultPrice;
	const finalPrice = dishInfo.finalPrice;
	return (
		<li className='py-5'>
			<div className='flex gap-x-8'>
				<div className='flex-1'>
					<span className='font-semibold text-gray-700 block'>{ dishInfo.name }</span>
					{
						( finalPrice ? (
							<div className='flex gap-x-2'>
								<span className='line-through text-gray-400'>Rs. { price / 100 }</span>
								<span className=''>Rs. { finalPrice / 100 }</span>
							</div>
						) : (
							<span className='block'>Rs. { price / 100 }</span>
						) )
					}
					<p className='mt-2 text-sm text-gray-600'>{ dishInfo.description }</p>
				</div>
				<div className='max-w-40 aspect-square relative'>
					<img
						className="w-full h-full object-cover rounded-lg"
						src={ CDN_URL + dishInfo.imageId }
					/>
					<button className='absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 bg-white p-2 rounded shadow leading-none text-green-600 font-semibold w-28'>Add</button>
				</div>
			</div>
		</li>
	)
}
