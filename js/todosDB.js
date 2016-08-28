let PouchDB = require('pouchdb'), 
	todosDB = todosDB || { },
	pubSub = require('pubsub-js');

PouchDB.plugin(require('pouchdb-upsert'));
todosDB.db =  new PouchDB('todos');

todosDB.addTodo = function(todo) {
	return this.db.put({
			_id: todo._id,
			title: todo.title,
			task: todo.task,
			priority: todo.priority,
			is_done: todo.is_done
		}).then( (res) => {
			todo._rev = res.rev;
			pubSub.publish('ADD_TODO', todo);
		});
}

todosDB.update = function(todo) {
		return this.db.upsert(todo._id, function(doc){
			for(let prop in todo) {
				doc[prop] = todo[prop];
			}
			return doc;
		});
}

todosDB.removeTodo = function(_id, _rev) {
	return this.db.remove(_id, _rev);
}

todosDB.getSingleTodo = function(_id) {
	return this.db.get(_id);
}

todosDB.getAll = function() {
	return this.db.allDocs({
		include_docs: true,
		descending: true
	});
}


module.exports = todosDB;