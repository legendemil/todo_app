require('./sass/main.sass');
import { addTodoForm } from './js/addTodoForm.js';
import { TodoList } from './js/TodoList.js';

(function() {
		window.PouchDB = require('pouchdb');
		let todosDB = todosDB || new PouchDB('todos'),
		todosList = new TodoList('.todos__list');

})();



