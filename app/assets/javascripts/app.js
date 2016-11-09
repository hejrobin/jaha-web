// Libraries
import React from 'react';
import DOM from 'react-dom';

// Components
import Application from './components/application';

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
	let targetNode = document.querySelector('#app');
	if(targetNode) {
		DOM.render(<Application />, targetNode);
	}
});
