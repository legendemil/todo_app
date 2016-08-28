let DOM = DOM || require('./utils/dom.js'),
	mapPriority = require('./utils/general.js').mapPriority;



module.exports = (function() {
	let notify = {};
	notify.detailsBox = null;
		
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
			hideBox(deleteMsg)
			deleteMsg.removeEventListener('click', deleteTodoItem);		
		});
	};
	
	notify.infoMsg = function() {
		let alertMsg = document.querySelector('.notify--alert');
		alertMsg.classList.add('show-popup');
		setTimeout(() => {
			alertMsg.classList.remove('show-popup');
			alertMsg.classList.add('hide-popup');
			setTimeout(() => {
				alertMsg.classList.remove('hide-popup');
			}, 300);
		}, 1800);
	}

	notify.detailsMsg = function(todo) {
		let box = getDetailsBox();
		
		box.querySelector('.notify__header-heading').innerHTML = todo.title;
		box.querySelector('.notify__task').innerHTML = `Task: ${todo.task}`;
		box.querySelector('.notify__priority').innerHTML = 'Priority: ' + mapPriority(todo.priority);
		box.querySelector('.notify__is-done').innerHTML = `Done: ${todo.is_done}`;

		box.classList.add('show-popup');
	}	

	function getDetailsBox() {
		if(notify.detailsBox === null) {
			notify.detailsBox = document.querySelector('.notify--details');
			notify.detailsBox
				.querySelector('.button--cross')
				.addEventListener('click', hideDetailsBox);
		}		 
		return notify.detailsBox;
	}

	function getNearestNotifyBox(target) {
		let box = null,
			parent = null;
		
		parent = target.parentNode;
		while(!box) {	
			if(parent.classList.contains('notify')) {
				box = parent;
				break;
			}
			if(parent.tagName === 'BODY')
				return null;
			parent = parent.parentNode;
		}			
		return box;
	}

	function hideBox(box, milliseconds) {
		box.classList.add('hide-popup');
		setTimeout(function() {
			box.classList.remove('show-popup');
			box.classList.remove('hide-popup');
		}, 300);
	}

	function hideDetailsBox(ev) {
		let box = notify.detailsBox;
		hideBox(box);
	}

	return notify;
})();