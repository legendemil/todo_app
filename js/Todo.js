let PouchDB = require('pouchdb'), 
	todosDB = todosDB || new PouchDB('todos')
	;

export class Todo {
	constructor(_id, task, priority, is_done = false) {
		this._id = _id;
		this.task = task;
		this.priority = priority;
		this.is_done = is_done;
	}

	add() {
		return todosDB.put({
			task: this.task,
			priority: this.priority,
			is_done: this.is_done
		}, this._id).then( () => alert('added'));
	}

	update() {

	}

	remove() {

	}
}