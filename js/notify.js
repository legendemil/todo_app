let DOM = DOM || require('./utils/dom.js');

module.exports = (function() {
	let notify = {};

	notify.deleteAlert = function() {
		let msg = document.querySelector('.notify--popup-delete'),
			returnValue = null;
		msg.classList.add('show-popup');
		msg.addEventListener('click', function(ev) {
			let target = ev.target;
			if(target.classList.contains('button--confirm')) {
				returnValue = true;
			} else if(target.classList.contains('button--cancel')) {
				returnValue = false;
			}
			msg.classList.add('hide-popup');
			return returnValue;
		});
	};


	return notify;
})();