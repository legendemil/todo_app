let DOM = DOM || require('./utils/dom.js');

module.exports = (function() {
	let notify = {};

	notify.deleteAlert = function(callback) {
		let msg = document.querySelector('.notify--popup-delete'),
			returnValue = null;
		msg.classList.add('show-popup');
		msg.addEventListener('click', function(ev) {
			let target = ev.target,
				deleteTodo = target.getAttribute('data-delete-todo') === 'true' ? true : false;
			if(deleteTodo) {
				callback();	
			}
			msg.classList.add('hide-popup');
			setTimeout(function() {
				msg.classList.remove('show-popup');
				msg.classList.remove('hide-popup');
			}, 300);
		});
	};


	return notify;
})();