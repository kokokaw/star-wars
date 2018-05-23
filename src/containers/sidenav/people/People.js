import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Input, Select } from 'antd';
import Ink from 'react-ink';

import './people.css';

import profileImg from '../../static/profile.jpg';
import loadingImg from '../../static/loading.gif';

import {
	peopleGetList,
	peopleSetDetails,
	peopleSetSelected
} from '../../../modules/people';

import {
	subsetGetDetails
} from '../../../modules/subset';

const InputGroup = Input.Group;
const Option = Select.Option;

const SUBSET = ['films', 'vehicles', 'species', 'starships', 'planets'];

class People extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading: true,
			page: 0
		}

        this.onChangeSelect = this.onChangeSelect.bind(this);
	}

	componentDidMount() {
		if (!this.props.peopleList[1]) {
			this.getPeopleList(1);
		}
	}

	onChangeSelect(value) {
		this.getPeopleList(value);
	}

	getPeopleList(page) {
		const { peopleList, peopleSelected } = this.props;
		
		this.setState({ page });

		if (!peopleList[page]) {
			this.setState({ loading: true });
			this.props.peopleGetList(page).then(res=>{
				if (!peopleSelected) {
					this.setState({ 
						loading: false
					});

					this.onPeopleClick(res.results[0]);
				} else {
					this.setState({ 
						loading: false
					});
				}
			});
		} 
	}

	onPeopleClick(people) {
		if (!this.props.peopleDetails[people.name]) {
			this.props.peopleSetDetails(people);
		}

		for (let value of SUBSET) {
			const key = (value === 'planets') ? 'homeworld' : value;
			const subsetVal = people[key];
			if (subsetVal instanceof Array) {
				for(let data of subsetVal) {
					const dataId = data.match(/([^\/]*)\/*$/)[1]; // eslint-disable-line
					
					if (!this.props.subsetData[value][dataId]) {
						this.props.subsetGetDetails(dataId, value);
					}
				}
			} else {
				const dataId = subsetVal.match(/([^\/]*)\/*$/)[1];
				if (!this.props.subsetData[value][dataId]) {
					this.props.subsetGetDetails(dataId, value);
				}
			}
		}

		this.props.peopleSetSelected(people.name);
	}

	render() {
		const { page, loading } = this.state;
		const { peopleSelected, peopleList } = this.props;

		let list = [];
		let optionList = [];
		let maxPageCount = 0;
		if (peopleList[page]) {
			list = peopleList[page].results.map( (people, i) => {
				return <li className={(people.name === peopleSelected) ? "active" : ""} key={`people${i}`} onClick={()=>this.onPeopleClick(people)}><a><Ink /><img src={profileImg} alt="profile1" /> {people.name}</a></li>
			})
			maxPageCount = Math.ceil(peopleList[page].count / 10);

			for(let i=1; i <= maxPageCount; i++) {
				optionList.push(<Option value={i} key={`optionPage${i}`}>{i}</Option>);
			}
		}

		const classN = (this.props.peopleSidenav) ? 'paginationHolder paginationHolderForce' : 'paginationHolder';

		return (
			<div className="peopleListHolder">
				<label>Character List</label>
				<ul className="navHolder">
					{(loading) ? <li className="loading"><img src={loadingImg} alt="loading" /></li> : list}
				</ul>

				<div className={classN}>
					<center>
						<InputGroup compact>
							<Button type="primary" disabled={(page === 1 || loading) ? true : false} onClick={()=>this.getPeopleList(page - 1)}>
								<Ink /><Icon type="left" />Prev
							</Button>
				          	<Select value={page} onChange={this.onChangeSelect} disabled={loading}>{optionList}</Select>
				          	<Button type="primary" disabled={(page === maxPageCount || loading) ? true : false} onClick={()=>this.getPeopleList(page + 1)}>
								<Ink />Next<Icon type="right" />
							</Button>
				        </InputGroup>
					</center>
				</div>
			</div>
		);
	}

}

const mapStateToProps = state => ({
	peopleList: state.people.list,
	peopleDetails: state.people.details,
	peopleSelected: state.people.selected,
	peopleSidenav: state.people.sidenav,
	subsetData: state.subset
});

const mapDispatchToProps = dispatch =>
bindActionCreators(
	{
		peopleGetList,
		peopleSetDetails,
		peopleSetSelected,
		subsetGetDetails
	},
	dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(People);