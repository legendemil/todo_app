import { Todo } from './Todo.js';
let todosDB = require('./todosDB.js'),
	DOM = require('./utils/dom.js'),
	mapPriority = require('./utils/general.js').mapPriority,
	pubSub = require('pubsub-js'),
	deleteAlert = require('./notify.js').deleteAlert,
	detailsMsg = require('./notify.js').detailsMsg;


export class TodoList {
	constructor(selector) {
		this.selector = 'todos__list';
		this.todos = [];
		this.element = document.querySelector('.' + this.selector);
		pubSub.subscribe('ADD_TODO', this.update.bind(this));
	}

	update(msg, todo) {
		let li = this.createSingleItem(todo);
		DOM.prependChild(this.element, li);
	}

	getTodos() {
		todosDB.getAll().then( res => {
			this.todos = res.rows;
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
	}

	removeSingleItem(ev) {
		ev.stopPropagation();
		deleteAlert(() => {
			// if user click yes, then delete todo
			let li = ev.target.parentNode,
				_id = li.getAttribute('data-id'),
				_rev = li.getAttribute('data-rev');
			todosDB.removeTodo(_id, _rev);
			li.classList.add('remove-todo');
			setTimeout(function() {
				li.parentNode.removeChild(li);
			},300);
		});	
	}


	createSingleItem(todo) {
		let li = null,
			liTodoText = null,
			trashBtn = null,
			checkBtn = null,
			checkBtnClass = todo.is_done ? ['icon-ok-circled'] : ['icon-check-empty'],
			priotityLabel = null;

		priotityLabel = DOM.createElement('sup', {
				text: mapPriority(todo.priority)
			});
		trashBtn = DOM.createElement('button',{
			classes: ['btn-checker'],
			childs: [DOM.createElement('i', { classes: ['icon-trash-empty'] })]
		});
		checkBtn = DOM.createElement('button', {
			classes: ['btn-checker'],
			childs: [DOM.createElement('i', { classes: checkBtnClass })]
		});
		li = DOM.createElement('li', {
			text: todo.title,
			classes: [this.selector + '-item'],
			childs: [priotityLabel, trashBtn, checkBtn]
		});

		li.setAttribute('data-id', todo._id);
		li.setAttribute('data-rev', todo._rev);
		li.setAttribute('data-done', todo.is_done);

		trashBtn.addEventListener('click', this.removeSingleItem);
		checkBtn.addEventListener('click', this.markTodo);
		li.addEventListener('click', this.showDetails);
		return li;
	}

	showDetails(ev) {
		let li = ev.currentTarget,
			todo = null;	
		todosDB.getSingleTodo(li.getAttribute('data-id'))
			.then( res => {
				detailsMsg(res);
			});
		
	}

	markTodo(ev) {
		ev.stopPropagation();
		let btn = ev.target,
			icon = btn.querySelector('i'),
			li = btn.parentNode,
			is_done = (li.getAttribute('data-done') === 'false') ? true : false,
			todo = {
				_id: li.getAttribute('data-id'),
				_rev: li.getAttribute('data-rev'),
				is_done: is_done
			};
		li.setAttribute('data-done', is_done);
		icon.classList.toggle('icon-check-empty');
		icon.classList.toggle('icon-ok-circled');

		todosDB.update(todo);
	}
}