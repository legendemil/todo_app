let PouchDB = require('pouchdb'), 
	todosDB = todosDB || { },
	pubSub = require('pubsub-js');

todosDB.db =  new PouchDB('todos');

todosDB.addTodo = function(todo) {
	return this.db.put({
			_id: todo._id,
			task: todo.task,
			priority: todo.priority,
			is_done: todo.is_done
		}).then( (res) => {
			todo._res = res;
			pubSub.publish('ADD_TODO', todo);
		});
}

todosDB.removeTodo = function(_id, _rev) {
	console.log('removing', _id, _rev);
	return this.db.remove(_id, _rev);
}


todosDB.getAll = function() {
	return this.db.allDocs({
		include_docs: true,
		descending: true
	});
}


module.exports = todosDB;