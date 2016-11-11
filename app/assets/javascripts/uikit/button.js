import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Button extends Component {

	static defaultProps = {
		isFluid: false,
		isBusy: false,
		isFlat: false,
		type: 'normal',
		buttonType: 'button',
		classNames: {}
	}

	static propTypes = {
		label: PropTypes.string.isRequired,
		isFluid: PropTypes.bool,
		isBusy: PropTypes.bool,
		isFlat: PropTypes.bool,
		type: PropTypes.oneOf([
			'normal', 'translucent', 'ghost'
		]),
		buttonType: PropTypes.oneOf([
			'button', 'submit', 'reset'
		]),
		classNames: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.array,
			PropTypes.object
		]),
		intent: PropTypes.string,
		size: PropTypes.oneOf([
			'tiny', 'small', 'medium', 'large', 'x-large', '2x-large', '3x-large'
		])
	}

	state = {
		isAnimating: false
	}

	componentProperties() {
		return {
			type: this.props.type,
			onClick: ::this.applyRippleEffect,
			disabled: this.isBusy
		};
	}

	componentClassNames() {
		let buttonIntent = (this.props.intent) ? `button--${this.props.intent}` : null;
		let buttonSize = (this.props.size) ? `button--${this.props.size}` : null;

		return {
			className: classNames('button', {
				'button--fluid': this.props.isFluid,
				'button--busy': this.props.isBusy,
				'button--flat': this.props.isFlat,
				'button--ghost': (this.props.type === 'ghost'),
				'button--translucent': (this.props.type === 'translucent')
			}, [buttonIntent, buttonSize], this.props.classNames)
		};
	}

	applyRippleEffect(event) {
		let {inkRipple} = this.refs;
		let inkBounds = inkRipple.getBoundingClientRect();
		let nodeBounds = event.target.getBoundingClientRect();
		let x = event.pageX - nodeBounds.left - inkBounds.width / 2;
		let y = event.pageY - nodeBounds.top - inkBounds.height / 2;

		inkRipple.addEventListener('webkitAnimationEnd', () => {
			inkRipple.classList.remove("button--ripple");
			this.setState({ isAnimating: false });
		}, false);

		if(!this.state.isAnimating) {
			this.setState({ isAnimating: true });
			inkRipple.classList.add("button--ripple");
			inkRipple.style.left = `${x}px`;
			inkRipple.style.top = `${y}px`;
		}

		return false;
	}

	render() {
		return (
			<button {...this.componentProperties()} {...this.componentClassNames()}>
				<i ref="inkRipple" className="button__ink"></i>
				{this.props.label}
			</button>
		);
	}

}
