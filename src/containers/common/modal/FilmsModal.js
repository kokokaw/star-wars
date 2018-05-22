import React, { Component } from 'react';
import { Modal, Button } from 'antd';

class FilmstModal extends Component {
	onClose() {
		this.props.toggleFilmsModal();
	}

	render() {
		const { data } = this.props;
		return (
			<Modal
				title={<span>{this.props.title}</span>}
				visible={this.props.show}
				onCancel={()=>this.onClose()}
				footer={[
					<Button key="back" onClick={()=>this.onClose()}>Close</Button>
				]}
			>
				<h3>{data.title}</h3>
				<p>
					<i>{data.opening_crawl}</i><br /><br />
					<b>Director:</b> {data.director}<br />
					<b>Producer:</b> {data.producer}<br />
					<b>Release Date:</b> {data.release_date}<br />
				</p>
			</Modal>
		);
	}
}

export default FilmstModal;