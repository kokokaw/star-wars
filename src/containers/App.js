import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Components */
import SideNav from './sidenav/SideNav';
import Details from './details/Details';

import './app.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			collapsed: false
		}
	}

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}

	render() {
		const classN = (this.props.peopleSidenav) ? 'mainContent mainContentForce' : 'mainContent';
		
		return (
			<div className="App">
				<SideNav />

				<div className={classN}>
					<Details />	
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	peopleSidenav: state.people.sidenav
});

export default connect(mapStateToProps)(App);