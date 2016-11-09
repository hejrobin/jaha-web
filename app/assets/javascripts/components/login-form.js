import React, {Component} from 'react';

export default class LoginForm extends Component {

	state = {
		initialized: false,
		authenticated: false,
		locked: false
	}

	handleLogin(event) {
		event.preventDefault();

		this.setState({
			initialized: true,
			locked: true,
		});

		this.props.api.authenticate(this.refs.username.value, this.refs.password.value).then((authenticated) => {
			this.setState({
				authenticated,
				locked: false
			});

			this.props.captureAuthentication(authenticated);
			this.refs.password.value = '';
		});
	}

	renderError() {
		if (this.state.initialized && !this.state.authenticated) {
			return (
				<p className={"login__form login__form--failed"}>
					Authentiction failed!
				</p>
			)
		}
	}

	render() {
		return (
			<article className="loginform">
				{::this.renderError()}
				<section>
					<div className="loginform__wrapper">
						<form onSubmit={::this.handleLogin}>
							<label>
								<strong>Username</strong>
								<input type="email" ref="username" disabled={this.state.locked} />
							</label>

							<label>
								<strong>Password</strong>
								<input type="password" ref="password" disabled={this.state.locked} />
							</label>

							<button type="submit">Authenticate</button>
						</form>
					</div>
				</section>
			</article>
		)
	}

}
