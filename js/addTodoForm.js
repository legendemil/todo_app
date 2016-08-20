import { Todo } from './Todo.js';

module.exports = (function() {
	let addBtn = document.querySelector('.heading__btn'),
		taskInp = document.querySelector('.heading__input-text'),
		priorityInp = document.querySelector('select[name="priority"]');

	addBtn.addEventListener('click', addNewTodo, false);

	function addNewTodo() {
		let todo = new Todo(
			new Date().toISOString(),
			taskInp.value,
			priorityInp.value);

		todo.add();
	}
})();