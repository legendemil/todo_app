let PouchDB = require('pouchdb'), 
	todosDB = todosDB || { };

todosDB.db =  new PouchDB('todos');

todosDB.addTodo = function(todo) {
	return this.db.put({
			_id: todo._id,
			task: todo.task,
			priority: todo.priority,
			is_done: todo.is_done
		}).then( () => console.log('added'));
}


todosDB.getAll = function() {
	return this.db.allDocs({
		include_docs: true,
		descending: true
	});
}


module.exports = todosDB;