'use strict';
const buttonHelp = document.querySelector('.payment-form__details__cvv-help');
const tooltipWindow = document.querySelector('.cvv-tooltip');

const toggle = () => {
	tooltipWindow.classList.toggle('tooltip--open');
};

buttonHelp.addEventListener('click', (e) => {
	e.stopPropagation();
	toggle();
});

const handleToggleTooltip = (e) => {
	const target = e.target;
	const tooltip = target == tooltipWindow || tooltipWindow.contains(target);
	let tooltip_is_active = tooltipWindow.classList.contains('tooltip--open');
	if (!tooltip && tooltip_is_active) {
		toggle();
	}
};

document.addEventListener('click', handleToggleTooltip);
