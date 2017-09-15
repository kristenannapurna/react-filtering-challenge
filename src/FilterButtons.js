import React from 'react';
import PropTypes from 'prop-types';


const FilterButtons = (props) => {
	return (

		<div className="filter">

			{props.filterData.map((item, index) => {
				let d = new Date();
				let key = d.getTime();
				return <button 
							key={key + index}
							onClick={() => props.filter(item, props.comparison)}
						>
							{item}
						</button>
			})}
		</div>


		)
}

FilterButtons.propTypes = {
	filterData: PropTypes.array.isRequired
}


export default FilterButtons;