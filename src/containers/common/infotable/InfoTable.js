import React, { Component } from 'react';
import { Row, Col } from 'antd';

import './infotable.css';

import FilmsModal from '../modal/FilmsModal';

class InfoTable extends Component {

	render() {
		const { data, filmsModal, filmsData } = this.props;
		const elements = [];

		for (let i=0; i < data.length; i++) {
			elements.push(
				<Col xs={24} sm={24} md={(data[i].label === 'Films') ? 24 : 12} key={`column${i}`}>
					<label className="labelDetails">{data[i].label}</label>
					<span className="infoDetails">
						{
							(data[i].content instanceof Array) ? 
								(data[i].content.length > 0) ? 
									(data[i].content.length === 1) ? data[i].content : <ol>{data[i].content}</ol> 
									: 
									<i>N/A</i> 
								: 
							data[i].content 
						}
					</span>
				</Col>
			);
		}

		return (
			<div className="infoTableHolder">
				<Row type="flex">{elements}</Row>

				{
					(filmsModal) ?
						<FilmsModal 
							show={filmsModal} 
							toggleFilmsModal={this.props.toggleFilmsModal.bind(this)}
							data={filmsData} 
							title="Film Details"
							subset="films"
						/> : ""
				}				
			</div>
		);
	}
}

export default InfoTable;