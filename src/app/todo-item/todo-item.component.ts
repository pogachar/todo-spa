import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../todo';
import { APIService } from '../api.service';
import { Response, HTTP_PROVIDERS } from "@angular/http";

@Component({
	moduleId: module.id,
	selector: 'app-todo-item',
	templateUrl: 'todo-item.component.html',
	styleUrls: ['todo-item.component.css'],
  providers: [HTTP_PROVIDERS, APIService]
})

export class TodoItemComponent {
	@Input() todo: Todo;
	@Output() onDeleted = new EventEmitter<Todo>();

  edit: boolean = false;
  errors: any[] = [];

  constructor(public api: APIService) {}

  toggleComplete () {
		this.todo.completed_at = (this.todo.completed_at) ? null : new Date().toISOString();
    this.updateTodo();
	}

	deleteTodo () {
    this.api.deleteTodo(this.todo).subscribe((response: Response) => {
      this.onDeleted.emit(this.todo);
    }, (error: Response) => {
      // console.log('error', error);
    });
	}

	editTodo () {
	  if(this.edit) {
	    this.updateTodo();
    } else {
      this.edit = !this.edit;
    }
	}

	hasError (key) {
	  return this.errors[key] && this.errors[key].length;
  }

	private updateTodo () {
	  this.errors = [];

    this.api.updateTodo(this.todo).subscribe((response: Response) => {
      let data = response.json().Task;

      if (data.completed_at === '0000-00-00 00:00:00') {
        data.completed_at = null;
      }

      this.edit = !this.edit;

      this.todo = data;
    }, (error: Response) => {
      this.errors = error.json();
    });
  }

}
