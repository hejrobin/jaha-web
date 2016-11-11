import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Card extends Component {

	static defaultProps = {
		isSegmented: false,
		type: 'normal',
		classNames: {}
	}

	static propTypes = {
		isSegmented: PropTypes.bool,
		type: PropTypes.oneOf([
			'normal', 'translucent', 'ghost'
		]),
		classNames: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.array,
			PropTypes.object
		])
	}

	componentProperties() {
		return {};
	}

	componentClassNames() {
		return {
			className: classNames('card', {
				'card--segmented': this.props.isSegmented,
				'card--ghost': (this.props.type === 'ghost'),
				'card--translucent': (this.props.type === 'translucent')
			}, this.props.classNames)
		};
	}

	render() {
		return (
			<article {...this.componentProperties()} {...this.componentClassNames()}>
				{this.props.children}
			</article>
		);
	}

}
