import React, {Component} from 'react';
import JahaApiLib from 'jaha-lib';

import Login from './login';
import Admin from './admin';

let api = new JahaApiLib();

export default class Application extends Component {

	state = {
		hasAuthenticated: false
	}

	observeAuthentication(hasAuthenticated) {
		if (hasAuthenticated === true) {
			this.setState({ hasAuthenticated });
		}
	}

	renderLogin() {
		if (!this.state.hasAuthenticated) {
			return (<Login api={api} observeAuthentication={::this.observeAuthentication} />);
		}
		return null;
	}

	renderAdmin() {
		if (this.state.hasAuthenticated) {
			return (<Admin api={api} />);
		}
		return null;
	}

	render() {
		return (
			<article className="deck deck--no-heading">
				{this.renderLogin()}
				{this.renderAdmin()}
			</article>
		);
	}

}
