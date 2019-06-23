import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Input from '../BaseInput'

const SearchInput = memo(({
	placeholder,
	width,
	height,
	name,
	value,
	onChange,
	handleKeyUp,
	autoFocus
}) => (
		<Input
			placeholder={placeholder}
			width={width}
			height={height}
			name={name}
			value={value}
			onChange={onChange}
			handleKeyUp={handleKeyUp}
			autoFocus={autoFocus}
		/>
	))

SearchInput.defaultProps = {
	width: '100%',
	height: '38px',
	value: '',
	autoFocus: false
}

SearchInput.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	placeholder: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	handleKeyUp: PropTypes.func.isRequired,
	autoFocus: PropTypes.bool,
}

export default SearchInput
