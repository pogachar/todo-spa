import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from "../todo";

@Component({
	moduleId: module.id,
	selector: 'app-todo-item',
	templateUrl: 'todo-item.component.html',
	styleUrls: ['todo-item.component.css']
})

export class TodoItemComponent {
	@Input() todo: Todo;
	@Output() onDeleted = new EventEmitter<Todo>();
	@Output() onChanged = new EventEmitter<Todo>();
  edit: boolean = false;

	toggleComplete () {
	  this.onChanged.emit(this.todo);
		this.todo.completed_at = (this.todo.completed_at) ? null : new Date().toISOString();
	}

	deleteTodo () {
    // TODO post to remote and delete todo on API

    this.onDeleted.emit(this.todo);
	}

	editTodo () {
	  this.onChanged.emit(this.todo);
	  this.edit = !this.edit;
	}

}
