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
			li = null;

		for(let todo of todos) {
			todo = todo.doc;
			li = this.createSingleItem(todo);
			output.appendChild(li);
		}
		this.element.appendChild(output);
		console.log('rendering');
	}


	_mapPriority(priority) {
		let label;
		switch(priority) {
			case 1:
				label = 'Low';
				break;
			case 2:
				label = 'Normal';
				break;
			case 3:
				label = 'High';
				break;
			default:
				label = 'Normal';
			return label;
		}
	}


	createSingleItem(todo) {
		let li = null,
			liTodoText = null,
			trashBtn = null,
			checkBtn = null,
			priotityLabel = null;

		priotityLabel = DOM.createElement('sup', {
				text: this._mapPriority(todo.priority)
			});
		trashBtn = DOM.createElement('button',{
			classes: ['btn-checker'],
			childs: [DOM.createElement('i', { classes: ['icon-trash-empty'] })]
		});
		checkBtn = DOM.createElement('button', {
			classes: ['btn-checker'],
			childs: [DOM.createElement('i', { classes: ['icon-check-empty'] })]
		});
		li = DOM.createElement('li', {
			text: todo.task,
			classes: [this.selector + '-item'],
			childs: [priotityLabel, trashBtn, checkBtn]
		});

		return li;
	}
}