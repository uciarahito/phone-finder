import React, { PureComponent } from 'react'

import SearchInput from 'views/ui-kit/Input/SearchInput'
import Filters from 'views/ui-kit/Filters'
import sortDown from 'assets/images/sort-down.svg'
import {
	MainContainer,
	FilterContainer,
	BodyContainer
} from './style'

class PhoneFinder extends PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			searchPhone: '',
			isYears: false,
			isBrands: false,
			filterYears: [],
			filterBrands: [],
			dataYears: [],
			dataBrands: [],
			dataPhones: [],
			currentFilterredData: [],
			selectedPhones: []
		}
	}

	componentDidMount() {
		return new Promise((resolve, reject) => {
			const requestTimeout = setTimeout(() => {
				reject(new Error('Request timeout.'))
			}, 12000)

			fetch('http://localhost:3000/phone.json')
				.then((response) => {
					clearTimeout(requestTimeout)
					return response
				})
				.then(response => response.json())
				.then((response) => {
					if (response && response.phones) {
						let years = []
						let brands = []
						response.phones.forEach(e => {
							years.push(e.release_year)
						});
						response.phones.forEach(e => {
							brands.push(e.brand)
						});
						years = [...new Set(years)].sort().reverse()
						brands = [...new Set(brands)].sort()
						this.setState({
							dataYears: years,
							dataBrands: brands,
							dataPhones: response.phones,
							defaultData: response.phones,
							newData: [...response.phones],
							currentFilterredData: [...response.phones]
						})
					}
					return resolve(response)
				})
				.catch((error) => {
					if (error.response) {
						alert('Oopps, There is something wrong when access data.')
					}
				})
		})
	}

	handleOnSearchChange = async ({ target }) => {
		RegExp.escape = function (string) {
			return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
		}
		var keyword = new RegExp(RegExp.escape(target.value.toString().toLowerCase()))
		await this.setState({
			[target.name]: target.value,
			keyword
		})
		this.reNewData()
	}

	handleOnKeyUp = e => {
		const { searchPhone } = this.state

		if ((searchPhone && e.keyCode === 46) || (searchPhone && e.keyCode === 8)) {
			RegExp.edataPhonesscape = function (string) {
				return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
			};
			var keyword = new RegExp(RegExp.escape(searchPhone.toString().toLowerCase()))
			this.setState({
				keyword
			})
			this.reNewData()
		}
	}

	handleOnCheckbox = filtered => () => {
		if (filtered === 'Years') {
			this.setState(prevState => ({
				isYears: !prevState.isYears
			}))
		}
		if (filtered === 'Brands') {
			this.setState(prevState => ({
				isBrands: !prevState.isBrands
			}))
		}
	}

	handleUpdateCheckbox = isChecked => ({ target }) => {
		const { filterYears, filterBrands } = this.state
		const { checked, name } = target
		if (checked) {
			isChecked === 'years' ? filterYears.push(Number(name)) : filterBrands.push(name)
		} else if (!checked) {
			isChecked === 'years' ? filterYears.splice(filterYears.indexOf(Number(name)), 1) : filterBrands.splice(filterBrands.indexOf(name), 1)
		}
		this.setState({
			filterYears
		})
		this.reNewData()
	}

	reNewData = () => {
		const { filterBrands, defaultData, filterYears, searchPhone, keyword } = this.state
		let newData = []
		if (filterBrands.length === 0 && filterYears.length === 0 && searchPhone.length === 0) {
			newData = defaultData
		} else {
			newData = [...defaultData].filter(e => {
				let temp = []
				if (filterBrands.length > 0 && filterYears.length > 0 && searchPhone.length > 0) {
					temp = filterYears.includes(+e.release_year) && filterBrands.includes(e.brand) && e.name.toLowerCase().match(keyword)
				} else if (filterBrands.length > 0 && filterYears.length > 0 && searchPhone.length === 0) {
					temp = filterYears.includes(+e.release_year) && filterBrands.includes(e.brand)
				} else if (filterBrands.length === 0 && filterYears.length > 0 && searchPhone.length > 0) {
					temp = filterYears.includes(+e.release_year) && e.name.toLowerCase().match(keyword)
				} else if (filterBrands.length > 0 && filterYears.length === 0 && searchPhone.length > 0) {
					temp = filterBrands.includes(e.brand) && e.name.toLowerCase().match(keyword)
				} else if (filterBrands.length > 0 && filterYears.length === 0 && searchPhone.length === 0) {
					temp = filterBrands.includes(e.brand)
				} else if (filterBrands.length === 0 && filterYears.length === 0 && searchPhone.length > 0) {
					temp = e.name.toLowerCase().match(keyword)
				} else if (filterBrands.length === 0 && filterYears.length > 0 && searchPhone.length === 0) {
					temp = filterYears.includes(+e.release_year)
				}
				return temp
			})
		}
		this.setState({
			dataPhones: newData
		})
	}

	renderCheckbox = (title, selected) => {
		return (
			<React.Fragment>
				<div className="title-filter">
					<div>{title}</div>
					<div>{(selected && selected.length === 0) ? `All ${title.toLowerCase()}` : 'Filtered...'}</div>
				</div>
				<div className="icon-filter"><img src={sortDown} alt="" /></div>
			</React.Fragment>
		)
	}

	renderItemPhone = (data, key) => {
		return (
			<div className="item-phone" key={key.toString()}>
				<div>{data.name}</div>
				<div>{data.description}</div>
				<div>Brand {data.brand}</div>
				<div>Released {data.release_year}</div>
			</div>
		)
	}

	render() {
		const {
			searchPhone,
			filterYears,
			filterBrands,
			isYears,
			isBrands,
			dataYears,
			dataBrands,
			dataPhones
		} = this.state
		return (
			<MainContainer>
				<SearchInput
					placeholder="Search phone"
					name="searchPhone"
					value={searchPhone}
					onChange={this.handleOnSearchChange}
					handleKeyUp={this.handleOnKeyUp}
				/>
				<FilterContainer>
					<div className="body-wrapper">
						<div className="title-wrapper">
							<div onClick={this.handleOnCheckbox('Years')}>
								{this.renderCheckbox('Years', filterYears)}
							</div>
							{isYears && <Filters
								handleUpdate={this.handleUpdateCheckbox('years')}
								dataFilters={dataYears}
								checkFilter={filterYears}
							/>}
						</div>
					</div>
					<div className="body-wrapper">
						<div className="title-wrapper">
							<div onClick={this.handleOnCheckbox('Brands')}>
								{this.renderCheckbox('Brands', filterBrands)}
							</div>
							{isBrands && <Filters
								handleUpdate={this.handleUpdateCheckbox('brands')}
								dataFilters={dataBrands}
								checkFilter={filterBrands}
							/>}
						</div>
					</div>
				</FilterContainer>
				<BodyContainer>
					{dataPhones && dataPhones.length > 0 && dataPhones.map((phoneItem, key) => (this.renderItemPhone(phoneItem, key)))}
				</BodyContainer>
			</MainContainer>
		)
	}
}

export default PhoneFinder
