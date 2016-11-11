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
		if(hasAuthenticated === true) {
			this.setState({ hasAuthenticated });
		}
	}

	render() {
		let {hasAuthenticated} = this.state;

		return (
			<article className="deck deck--no-heading">
				<Login shouldRender={!hasAuthenticated} api={api} observeAuthentication={::this.observeAuthentication} />
				<Admin shouldRender={hasAuthenticated} api={api} />
			</article>
		)
	}

}
