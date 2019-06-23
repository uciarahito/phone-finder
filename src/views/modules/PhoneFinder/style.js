import styled from 'styled-components'

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 20px;
`

const FilterContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-top: 15px;

	.body-wrapper {
		width: 40%;
    display: flex;
    position: relative;
	}

	.title-wrapper {
		border: 1px solid gray;
		position: absolute;
    z-index: 1;
		background-color: #ffffff;

		> div:first-child {
			display: flex;
			flex-direction: row;

			.title-filter {
				display: flex;
				flex-direction: column;
				padding: 10px;

				> div:first-child {
					font-size: 18px;
				}
				> div:last-child {
					font-size: 14px;
				}
			}

			.icon-filter {
				display: flex;
				align-items: center;
				padding: 0 5px;

				img {
					width: 25px;
					height: 25px;
				}
			}
		}
	}
`

const BodyContainer = styled.div`
	margin-top: 70px;
	border: 1px solid gray;
	height: auto;
	display: grid;
	grid-template-columns: 1fr 1fr;

	.item-phone {
		width: 95%;
		float: left;
		border: 1px solid gray;
		margin: 5px;

		> div:first-child {
			font-size: 18px;
			font-weight: 500;
		}

		> div:nth-child(2) {
			margin: 15px 0;
			font-size: 14px;
		}

		> div:nth-child(3) {
			margin-bottom: 10px;
		}
	}
`

export {
	MainContainer,
	FilterContainer,
	BodyContainer
}