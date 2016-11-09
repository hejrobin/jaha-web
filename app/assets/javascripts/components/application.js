import React, {Component} from 'react';

import LoginForm from './login-form';

import JahaApiLib from 'jaha-lib';

let api = new JahaApiLib();

export default class Application extends Component {

	captureAuthentication(authenticated) {
		console.log(authenticated);
	}

	render() {
		return (
			<LoginForm api={api} captureAuthentication={::this.captureAuthentication} />
		)
	}

}
