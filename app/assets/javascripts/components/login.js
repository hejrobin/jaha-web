import React, {Component, PropTypes} from 'react';

import Card from '../uikit/card';
import Segment from '../uikit/segment';
import TextField from '../uikit/textfield';
import Button from '../uikit/button';

export default class LoginForm extends Component {

	static defaultProps = {
		shouldRender: true,
		observeChange: function() {}
	}

	static propTypes = {
		shouldRender: PropTypes.bool,
		api: PropTypes.object.isRequired,
		observeAuthentication: PropTypes.func
	}

	state = {
		hasAuthenticated: false,
		isAuthenticating: false
	}

	handleAuthentication(event) {
		event.preventDefault();

		this.setState({
			isAuthenticating: true
		});

		this.props.api.authenticate(this.refs.username.value, this.refs.password.value).then((hasAuthenticated) => {
			this.setState({ hasAuthenticated, isAuthenticating: false });
			this.props.observeAuthentication(hasAuthenticated);
		})
	}

	render() {
		if(!this.props.shouldRender) {
			return null;
		}

		return (
			<article className={"max-width--420px"}>
				<Card isSegmented={true}>
					<form onSubmit={::this.handleAuthentication}>
						<Segment>
							<TextField ref="username" type="email" label="Username" />
							<TextField ref="password" type="password" label="Password" />
						</Segment>
						<Segment isActionBar={true}>
							<Button buttonType="submit" label="Log in" isBusy={this.state.isAuthenticating} intent="action" isFluid={true} type="ghost" size="medium" />
						</Segment>
					</form>
				</Card>
			</article>
		);
	}

}
