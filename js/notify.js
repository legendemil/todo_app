let DOM = DOM || require('./utils/dom.js');

module.exports = (function() {
	let notify = {};

	notify.deleteAlert = function(callback) {
		let deleteMsg = document.querySelector('.notify--popup-delete');
		deleteMsg.classList.add('show-popup');
		deleteMsg.addEventListener('click', function deleteTodoItem(ev) {
			let target = ev.target,
				deleteTodo = null;

			if(target.tagName.toLowerCase() !== 'button')
				return false;
			deleteTodo = target.getAttribute('data-delete-todo') === 'true' ? true : false;
			if(deleteTodo) {
				callback();	
			} 
			deleteMsg.classList.add('hide-popup');
			setTimeout(function() {
				deleteMsg.classList.remove('show-popup');
				deleteMsg.classList.remove('hide-popup');
			}, 300);	
			deleteMsg.removeEventListener('click', deleteTodoItem);		
		});
	};


	return notify;
})();