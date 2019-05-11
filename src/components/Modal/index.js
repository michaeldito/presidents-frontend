import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Wrapper, ModalContent, ModalContentRow, ModalHeaderArea, ModalMainContent } from './components';

const name = 'name'
const totalGames = 100;
const prez = 30;
const ass = 40;

export default class Modal extends Component {
	constructor(props) {
		super(props);
		this._root = document.getElementById('modal-root');
		this.state = {
			active: false
		}
	}

	toggle = event => {
		console.log('outside!')
    this.setState({active: !this.state.active});
  }

	render() {
		if (!this.state.active) {
			return null;
		}

		const modal = (
			<Wrapper onClick={this.toggle}>
				<ModalContent>
				
					<ModalHeaderArea>
						Player Profile
					</ModalHeaderArea>

					<ModalMainContent>
						<ModalContentRow>Name: {name}</ModalContentRow>
						<ModalContentRow>Total Games Played: {totalGames}</ModalContentRow>
						<ModalContentRow>Prez wins: {prez}</ModalContentRow>
						<ModalContentRow>Assholes: {ass}</ModalContentRow>
					</ModalMainContent>

				</ModalContent>
			</Wrapper>
		);

		// This uses a portal to a top-level div (#modal-root) so that opening
		// modals doesn't interfere with the DOM tree of the main app
		return ReactDOM.createPortal(modal, this._root);
	}
}
