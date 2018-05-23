import React, { Component } from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import './sidenav.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

/* Common Components */
import HeaderLogo from '../common/headerlogo/HeaderLogo';

/* Sub Components */
import People from '../people/People';

class SideNav extends Component {
	constructor(props){
		super(props);
		this.state = {
			userModal: false
		}
	}

	render() {
		const classN = (this.props.peopleSidenav) ? 'sideNavWrapper sideNavWrapperForce' : 'sideNavWrapper';
		return (
			<div className={classN}>
				<PerfectScrollbar>
					<HeaderLogo />
					<People />
				</PerfectScrollbar>
			</div>
		);
	}

}

const mapStateToProps = state => ({
	peopleSidenav: state.people.sidenav
});

export default connect(mapStateToProps)(SideNav);