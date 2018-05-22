import React, { Component } from 'react';

import './headerlogo.css';

import logo from '../../static/logo.png';

class HeaderLogo extends Component {
	render() {
		return (
			<div>
				<h3 className="headerLogoWrapper">
					<div className="overlay"></div>
					<div className="contentHolder">
						<img src={logo} alt="Logo" />
					</div>
				</h3>
			</div>
		);
	}
}

export default HeaderLogo;