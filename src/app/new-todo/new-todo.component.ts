import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from "../todo";
import { Form } from "@angular/forms";

@Component({
	moduleId: module.id,
	selector: 'app-new-todo',
	templateUrl: 'new-todo.component.html',
	styleUrls: ['new-todo.component.css']
})

export class NewTodoComponent {
	@Output() onCreated = new EventEmitter<Todo>();

	todo: Todo = new Todo();
	active: boolean = false;

	createTodo (form: Form) {
    // TODO post to remote and emit with response data
    // this.onCreated.emit(new Todo(response.data));

    this.onCreated.emit(this.todo);
		this.todo = new Todo();
		this.active = false;
	}

}
