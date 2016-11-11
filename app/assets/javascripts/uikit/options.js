import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Options extends Component {

	static defaultProps = {}

	static propTypes = {
		label: PropTypes.string.isRequired,
		options: PropTypes.array.isRequired
	}

	componentProperties() {
		return {};
	}

	componentClassNames() {
		return {
			className: classNames('options', this.props.classNames)
		};
	}

	get value() {
		let {selectedIndex} = this.refs.optionsInput;
		return this.refs.optionsInput[selectedIndex].value;
	}

	reset() {
		this.refs.optionsInput.selectedIndex = 0;
	}

	render() {
		if (Object.keys(this.props.options).length > 0) {
			return (
				<label {...this.componentProperties()} {...this.componentClassNames()}>
					<strong>{this.props.label}</strong>
					<div className="options__select">
						<select ref="optionsInput">
							{this.props.options.map((option, i) => {
								return (<option key={i} value={option.uuid}>{option.name}</option>);
							})}
						</select>
					</div>
				</label>
			);
		}
		return null;
	}

}
