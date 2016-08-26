import { Todo } from './Todo.js';

module.exports = (function() {
	let form = document.querySelector('.form-add-todo'),
		titleInp = document.querySelector('.heading__input-text'),
		taskInp = document.querySelector('.heading__textarea'),
		priorityInp = document.querySelectorAll('input[name="priority"]'),
		choosedPriority = priorityInp[1];
	
	// bind events
	form.addEventListener('submit', addNewTodo, false);
	bindRadioEvents();


	function clearInputs() {
		// clear todo's title and task 
		taskInp.value = '';
		titleInp.value = '';

		// clear priority
		choosedPriority.classList.remove('radio-box__radio--checked');
		priorityInp[1].checked = true;
		priorityInp[1].classList.add('radio-box__radio--checked');	
		choosedPriority = priorityInp[1];
		
	}

	function addNewTodo(ev) {
		ev.preventDefault();
		if(!taskInp.value || !titleInp.value) {
			alert("You don't type a todo");
			return false;
		}
		let todo = new Todo(
			new Date().toISOString(),
			titleInp.value,
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