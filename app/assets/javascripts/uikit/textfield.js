import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class TextField extends Component {

	static defaultProps = {
		placeholder: null,
		type: 'text'
	}

	static propTypes = {
		label: PropTypes.string.isRequired,
		placeholder: PropTypes.string,
		type: PropTypes.oneOf([
			'color',
			'date',
			'datetime',
			'datetime-local',
			'email',
			'month',
			'number',
			'password',
			'range',
			'search',
			'tel',
			'text',
			'time',
			'url',
			'week'
		]),
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func
	}

	state = {
		isFocused: false
	}

	componentProperties() {
		return {};
	}

	componentClassNames() {
		return {
			className: classNames('textfield', {
				'textfield--focused': this.state.isFocused
			}, this.props.classNames)
		};
	}

	handleOnFocus() {
		this.setState({ isFocused: true });
		if (this.props.onFocus) {
			this.props.onFocus();
			return;
		}
	}

	handleOnBlur() {
		this.setState({ isFocused: false });
		if (this.props.onBlur) {
			this.props.onBlur();
			return;
		}
	}

	get value() {
		return this.refs.textField.value;
	}

	reset() {
		this.refs.textField.value = null;
	}

	render() {
		return (
			<label {...this.componentProperties()} {...this.componentClassNames()}>
				<strong>{this.props.label}</strong>
				<input
					ref="textField"
					type={this.props.type}
					placeholder={this.props.placeholder}
					onChange={this.props.onChange}
					onFocus={::this.handleOnFocus}
					onBlur={::this.handleOnBlur}
				/>
			</label>
		);
	}

}
