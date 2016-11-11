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
		observeChange: PropTypes.func
	}

	componentDidUpdate(prevProps, prevState) {
		this.props.observeChange(this.state);
	}

	render() {
		if(!this.props.shouldRender) {
			return null;
		}

		return (
			<Card isSegmented={true}>
				<Segment>
					<h1 className="card__heading">Create new statement</h1>
					<p>Create a new statement below, make sure that you begin with a lowercase and do not add punctuation. Statements are formatted as such; <code>Jag har aldrig &#123;statement&#125;&hellip;</code></p>
				</Segment>

				<Segment>
					<TextField label="Statement" placeholder="Jag har aldrig..." />
				</Segment>

				<Segment isActionBar={true}>
					<Button label="Create new statement" intent="commit" />
				</Segment>
			</Card>
		);
	}

}
