let todosDB = require('./todosDB.js');

export class Todo {
	constructor(_id, title, task, priority, is_done = false) {
		this._id = _id;
		this.title = title;
		this.task = task;
		this.priority = priority;
		this.is_done = is_done;
	}
	
	// add to a db
	add() {
		let todo = {
			_id: this._id,
			title: this.title,
			task: this.task,
			priority: Number(this.priority),
			is_done: Boolean(this.is_done)
		}
		todosDB.addTodo(todo);
	}
	
	update() {

	}

	remove() {

	}
}