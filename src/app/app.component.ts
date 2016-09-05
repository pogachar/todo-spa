import { Component, OnInit } from '@angular/core';
import { NewTodoComponent } from './new-todo/new-todo.component'
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { Todo } from "./todo";
import { Response, HTTP_PROVIDERS } from '@angular/http';
import { APIService } from "./api.service";

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css'],
	directives: [NewTodoComponent, TodoItemComponent],
  providers: [HTTP_PROVIDERS, APIService]
})

export class AppComponent implements OnInit {
  todos: any[] = [];
  computedPagination: any[] = [];

	pagination = {
		total: this.todos.length,
		per_page: 3,
		current_page: 1,
		last_page: Math.ceil(this.todos.length / 3),
		from: 1,
		to: 3
	};

  constructor(public api: APIService) {}

	get computedTodos (): any[] {
		return this.todos.slice(this.pagination.from - 1, this.pagination.to);
	}

	createTodo (todo: Todo) {
    this.getTodos(1);
	}

	deleteTodo (todo: Todo) {
    this.getTodos(this.todos.length ? this.pagination.current_page : 1);
	}

	changePage (e, page) {
		e.preventDefault();

    this.getTodos(page);
	}

  private calculatePaginationArray () {
    if(!this.pagination.to) {
      return [];
    }

    let offset = 2;

    let from = this.pagination.current_page - offset;
    if(from < 1) {
      from = 1;
    }

    let to = from + (offset * 2);
    if(to >= this.pagination.last_page) {
      to = this.pagination.last_page;
    }

    let arr = [];
    while (from <= to) {
      arr.push(from);
      from++;
    }

    this.computedPagination = arr;
  }

	private getTodos (page = 1) {
    this.api.getTodos({ page }).subscribe((response: Response) => {
      let data = response.json();
      this.todos = [];

      data.data.forEach(todo => {
        if (todo.Task.completed_at === '0000-00-00 00:00:00') {
          todo.Task.completed_at = null;
        }

        this.todos.push(new Todo(todo.Task));
      });

      this.pagination = data.pagination;

      this.calculatePaginationArray();
    }, (error: Response) => {
      // console.log('error', error);
    });
  }

  ngOnInit () {
    this.getTodos(1);
  }

}
