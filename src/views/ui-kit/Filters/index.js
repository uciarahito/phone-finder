import React from 'react';

const Filters = ({ dataFilters, checkFilter, handleUpdate }) => (
	<div>
		{dataFilters.map((item, key) => (
			<div key={key.toString()}>
				<label htmlFor="">
					<input
						type="checkbox"
						name={item}
						onChange={handleUpdate}
						checked={(checkFilter.includes(item))}
					/>
					{item}
				</label>
			</div>
		))}
	</div>
)

export default Filters;