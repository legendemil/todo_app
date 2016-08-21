import { Todo } from './Todo.js';
let todosDB = require('./todosDB.js'),
	DOM = require('./utils/dom.js');


export class TodoList {
	constructor(selector) {
		this.selector = 'todos__list';
		this.todos = [];
		this.element = document.querySelector('.' + this.selector);
	}

	update() {
		
	}

	getTodos() {
		todosDB.getAll().then( res => {
			this.todos = res.rows;
			console.log('from db:', this.todos);
			this.render();
		});
	}

	render() {
		let todos = this.todos;
		let output = document.createDocumentFragment(),
			li = null,
			liTodoText = null,
			trashBtn = null,
			checkBtn = null;

		for(let todo of todos) {
			todo = todo.doc;
			trashBtn = DOM.createElement('button', classes = ['btn-checker'], childs = [
				DOM.createElement('i', classes = ['icon-trash-empty'])
			]);
			checkBtn = DOM.createElement('button', classes = ['btn-checker'], childs = [
				DOM.createElement('i', classes = ['icon-check-empty'])
			]);
			li = DOM.createElement('li', todo.task, this.selector + '-item', childs = [ trashBtn, checkBtn]);

			output.appendChild(li);
		}
		this.element.appendChild(output);
		console.log('rendering');
	}
}