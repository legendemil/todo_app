import { Todo } from './Todo.js';

module.exports = (function() {
	let addBtn = document.querySelector('.heading__btn'),
		taskInp = document.querySelector('.heading__input-text'),
		priorityInp = document.querySelectorAll('input[name="priority"]'),
		choosedPriority = priorityInp[1];
	
	// bind events
	addBtn.addEventListener('click', addNewTodo, false);
	bindRadioEvents();


	function clearInputs() {
		taskInp.value = '';
		choosedPriority.classList.remove('radio-box__radio--checked');
		priorityInp[1].checked = true;
		priorityInp[1].classList.add('radio-box__radio--checked');	
		choosedPriority = priorityInp[1];
		console.log(priorityInp);
	}

	function addNewTodo() {
		if(!taskInp.value) {
			alert("You don't type a todo");
			return false;
		}
		let todo = new Todo(
			new Date().toISOString(),
			taskInp.value,
			choosedPriority.value);
		todo.add();
		clearInputs();
	}

	function radioBtnChange(ev) {
		let target = ev.target;
		choosedPriority.classList.remove('radio-box__radio--checked');
		target.classList.add('radio-box__radio--checked');
		choosedPriority = target;
	}

	function bindRadioEvents() {
		for(let inp of priorityInp) {
			inp.addEventListener('change', radioBtnChange);
		}
	}


})();