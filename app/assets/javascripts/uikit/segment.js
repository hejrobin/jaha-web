import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Segment extends Component {

	static defaultProps = {
		isActionBar: false
	}

	static propTypes = {
		isActionBar: PropTypes.bool,
	}

	componentProperties() {
		return {};
	}

	componentClassNames() {
		return {
			className: classNames('segment', {
				'actions': this.props.isActionBar
			}, this.props.classNames)
		};
	}

	render() {
		return (
			<section {...this.componentProperties()} {...this.componentClassNames()}>
				{this.props.children}
			</section>
		);
	}

}
