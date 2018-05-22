import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Icon } from 'antd';

import './details.css';

import loadingImg from '../static/loading.gif';

import InfoTable from '../common/infotable/InfoTable';

import {
	peopleSidenavToggle
} from '../../modules/people';

class Details extends Component {
	constructor(props){
		super(props);
		this.state = {
			filmsModal: false,
			loading: false,
			selectedFilm: null
		}
	}

	toggleSideNav = () => {
		this.props.peopleSidenavToggle();
	}

	toggleFilmsModal = () => {
		this.setState({ filmsModal: !this.state.filmsModal });
	}

	onClickFilm = (data) => {
		this.setState({ selectedFilm: data });
		this.toggleFilmsModal();
	}

	render() {
		const { filmsModal, selectedFilm } = this.state;
		const { 
			peopleSelected, 
			peopleDetails, 
			subsetData
		} = this.props;

		if (peopleDetails[peopleSelected]) {
			const people = peopleDetails[peopleSelected];

			const collection = [
				{
					label: 'Name',
					content: people.name
				},
				{
					label: 'Birth Year',
					content: people.birth_year
				},
				{
					label: 'Mass',
					content: people.mass
				},
				{
					label: 'Gender',
					content: people.gender
				},
				{
					label: 'Hair Color',
					content: people.hair_color
				},
				{
					label: 'Skin Color',
					content: people.skin_color
				},
				{
					label: 'Eye Color',
					content: people.eye_color
				},
				{
					label: 'Height',
					content: people.height
				}
			];
			
			const species = people.species.map( (specie, key) => {
				const specieId = specie.match(/([^\/]*)\/*$/)[1]; // eslint-disable-line
				return <li key={`species${key}`}>{ (subsetData.species[specieId]) ? subsetData.species[specieId].name : '...' }</li>;
			});
			collection.push({
				label: 'Species',
				content: species
			});

			const planetId = people.homeworld.match(/([^\/]*)\/*$/)[1]; // eslint-disable-line
			const planets = <li key="planetsId">{ (subsetData.planets[planetId]) ? subsetData.planets[planetId].name : '...' }</li>;
			collection.push({
				label: 'Home World',
				content: planets
			});
			
			const starships = people.starships.map( (starship, key) => {
				const starshipId = starship.match(/([^\/]*)\/*$/)[1]; // eslint-disable-line
				return <li key={`starships${key}`}>{ (subsetData.starships[starshipId]) ? subsetData.starships[starshipId].name : '...' }</li>;
			});
			collection.push({
				label: 'Starships',
				content: starships
			});
			
			const vehicles = people.vehicles.map( (vehicle, key) => {
				const vehicleId = vehicle.match(/([^\/]*)\/*$/)[1]; // eslint-disable-line
				return <li key={`vehicle${key}`}>{ (subsetData.vehicles[vehicleId]) ? subsetData.vehicles[vehicleId].name : '...' }</li>;
			});
			collection.push({
				label: 'Vehicles',
				content: vehicles
			});

			const films = people.films.map( (film, key) => {
				const filmId = film.match(/([^\/]*)\/*$/)[1]; // eslint-disable-line
				return <li key={`film${key}`}>{ (subsetData.films[filmId]) ? <a onClick={()=>this.onClickFilm(subsetData.films[filmId])}>{subsetData.films[filmId].title}</a> : '...' }</li>;
			});
			collection.push({
				label: 'Films',
				content: films
			});

			return (
				<div className="detailsWrapper">
					<h1>
						<a className="toggleSideNav" onClick={()=>this.toggleSideNav()}><Icon type="menu-unfold" /></a>
						{peopleSelected}
					</h1>
					<div className="content">
						<Card>
							<InfoTable data={collection} filmsModal={filmsModal} filmsData={selectedFilm} toggleFilmsModal={this.toggleFilmsModal.bind(this)}  />
						</Card>
					</div>
				</div>
			);
		}
		return <div className="detailsLoading"><img src={loadingImg} alt="loading" /></div>;
	}

}

const mapStateToProps = state => ({
	peopleSelected: state.people.selected,
	peopleDetails: state.people.details,
	subsetData: state.subset
});

const mapDispatchToProps = dispatch =>
bindActionCreators(
	{
		peopleSidenavToggle
	},
	dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Details);