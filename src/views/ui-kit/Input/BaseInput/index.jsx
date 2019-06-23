import React, {
	Fragment,
	memo,
	useState
} from 'react'
import PropTypes from 'prop-types'

import searchNormalOff from 'assets/images/search-normal-off.svg'
import searchNormalOn from 'assets/images/search-normal-on.svg'

import { InputContainer, MainContainer } from './style'

const Input = memo(({
	onChange: onChangeProps,
	width,
	type,
	placeholder,
	name,
	value,
	handleKeyUp,
	autoComplete,
	disabled,
	readOnly,
	isError,
	height,
	dataId,
	autoFocus
}) => {
	const [isSearchFocus, setIsSearchFocus] = useState(false)

	const setFocusBlur = (bool) => {
		setIsSearchFocus(bool)
	}

	const onFocus = () => setFocusBlur(true)
	const onBlur = () => setFocusBlur(false)

	return (
		<Fragment>
			<MainContainer height={height}>
				<InputContainer
					width={width}
					height={height}
					isError={isError}
				>
					<input
						type={type}
						placeholder={placeholder}
						name={name}
						value={value}
						onChange={onChangeProps}
						autoComplete={autoComplete}
						disabled={disabled}
						readOnly={readOnly}
						onFocus={onFocus}
						onBlur={onBlur}
						onKeyUp={handleKeyUp}
						data-id={dataId}
						autoFocus={autoFocus}
					/>
					<div className="icon-search" role="presentation">
						<img
							src={isSearchFocus ? searchNormalOn : searchNormalOff}
							alt="search-icon"
							width="100%"
							height="100%"
						/>
					</div>
				</InputContainer>
			</MainContainer>
		</Fragment>
	)
})

Input.propTypes = {
	autoComplete: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	handleKeyUp: PropTypes.func,
	name: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	dataId: PropTypes.number,
	autoFocus: PropTypes.bool,
	width: PropTypes.string,
	height: PropTypes.string,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	isError: PropTypes.bool
}

Input.defaultProps = {
	autoComplete: 'off',
	placeholder: '',
	onChange: () => null,
	handleKeyUp: () => null,
	name: '',
	value: '',
	dataId: null,
	autoFocus: false,
	width: '',
	height: '',
	disabled: false,
	readOnly: false,
	isError: false
}

export default Input
