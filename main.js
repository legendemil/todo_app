// initialize adding todos form
let addTodoForm = require('./js/addTodoForm.js');
import { TodoList } from './js/TodoList.js';

(function() {
		window.PouchDB = require('pouchdb');
		let todosDB = todosDB || new PouchDB('todos'),
		todosList = new TodoList();
		todosList.getTodos();
})();



