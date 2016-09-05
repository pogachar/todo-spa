import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from "../todo";
import { Form } from "@angular/forms";
import { APIService } from '../api.service';
import { Response, HTTP_PROVIDERS } from '@angular/http';

@Component({
	moduleId: module.id,
	selector: 'app-new-todo',
	templateUrl: 'new-todo.component.html',
	styleUrls: ['new-todo.component.css'],
  providers: [HTTP_PROVIDERS, APIService]
})

export class NewTodoComponent {
	@Output() onCreated = new EventEmitter<Todo>();

	todo: Todo = new Todo();
	active: boolean = false;
  errors: any[] = [];

  constructor(public api: APIService) {}

	createTodo (form: Form) {
	  this.errors = [];

    this.api.createTodo(this.todo).subscribe((response: Response) => {
      this.onCreated.emit(this.todo);
      this.todo = new Todo();
      this.active = false;
    }, (error: Response) => {
      this.errors = error.json();
    });
	}

  hasError (key) {
    return this.errors[key] && this.errors[key].length;
  }

}
