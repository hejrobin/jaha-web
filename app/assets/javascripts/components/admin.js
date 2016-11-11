import React, {Component, PropTypes} from 'react';

import Card from '../uikit/card';
import Segment from '../uikit/segment';
import TextField from '../uikit/textfield';
import Button from '../uikit/button';
import Options from '../uikit/options';

export default class LoginForm extends Component {

	static defaultProps = {
		observeChange: function() {}
	}

	static propTypes = {
		api: PropTypes.object.isRequired,
		observeChange: PropTypes.func
	}

	state = {
		categories: [],
		success: null,
		error: null,
		isRequesting: false
	}

	componentDidMount() {
		this.props.api.get('categories').then((json) => {
			this.setState({
				categories: json.records
			});
		});
	}

	componentDidUpdate(prevProps, prevState) {
		this.props.observeChange(this.state);
	}

	handleCreate(event) {
		event.preventDefault();

		this.setState({
			error: null,
			message: null,
			isRequesting: true
		});

		if (this.refs.statementBody.value.length < 3) {
			this.setState({
				error: 'Statement must have a body.',
				isRequesting: false
			});
			return false;
		}

		this.props.api.post('statements', {
			body: this.refs.statementBody.value,
			category: this.refs.statementCategory.value
		}).then((json) => {
			this.setState({
				isRequesting: false
			});

			if (json.error) {
				this.setState({
					error: json.error
				});
			} else {
				this.setState({
					success: "Statement successfully created."
				});
				this.refs.statementCategory.reset()
				this.refs.statementBody.reset()
			}
		});
	}

	renderMessage() {
		if (this.state.error || this.state.success) {
			let messageClassName = (this.state.error) ? 'error' : 'success';
			let messageBody = (this.state.error) ? this.state.error : this.state.success;
			return (
				<Segment classNames={messageClassName}>
					<p>{messageBody}</p>
				</Segment>
			);
		}
		return null;
	}

	render() {
		return (
			<Card isSegmented={true}>
				<form onSubmit={::this.handleCreate}>
					<Segment>
						<h1 className="card__heading">Create new statement</h1>
						<p>Create a new statement below, make sure that you begin with a lowercase and do not add punctuation. Statements are formatted as such; <code>Jag har aldrig &#123;statement&#125;&hellip;</code></p>
					</Segment>
					{this.renderMessage()}
					<Segment>
						<Options ref="statementCategory" label="Options" options={this.state.categories} />
						<TextField ref="statementBody" label="Statement" placeholder="Jag har aldrig..." />
					</Segment>

					<Segment isActionBar={true}>
						<Button label="Create new statement" intent="commit" isBusy={this.state.isRequesting} />
					</Segment>
				</form>
			</Card>
		);
	}

}
