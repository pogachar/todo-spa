import { Component, OnInit } from '@angular/core';
import { NewTodoComponent } from './new-todo/new-todo.component'
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { Todo } from "./todo";

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css'],
	directives: [
		NewTodoComponent, TodoItemComponent
	]
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

	get computedTodos (): any[] {
		return this.todos.slice(this.pagination.from - 1, this.pagination.to);
	}

	createTodo (todo: Todo) {
	  // TODO remove fake data when API is implemented
    todo.id = this.todos[this.todos.length - 1].id + 1;
    todo.completed_at = null;
    this.todos.unshift(todo);

    this.calculatePaginationArray();
    this.saveToLocalStorage();
	}

	deleteTodo (todo: Todo) {
		this.todos.splice(this.todos.indexOf(todo), 1);

    this.calculatePaginationArray();
    this.saveToLocalStorage();
	}

	editTodo (todo: Todo) {
    this.saveToLocalStorage();
  }

	changePage (e, page) {
		e.preventDefault();

    this.calculatePagination(page);
	}

  private calculatePaginationArray () {
    this.calculatePagination();

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

	private calculatePagination (page = null) {
    this.pagination.total = this.todos.length;
    this.pagination.last_page = Math.ceil(this.todos.length / 3);

    if(page) {
      this.pagination.current_page = page;
      this.pagination.from = (page - 1) * this.pagination.per_page + 1;
      this.pagination.to = page * this.pagination.per_page;
    }
  }

	private saveToLocalStorage() {
	  localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  ngOnInit () {
    if(localStorage.getItem('todos')) {
      let todos = JSON.parse(localStorage.getItem('todos'));

      todos.forEach(todo => {
        this.todos.push(new Todo(todo));
      });

      if(!todos.length) {
        this.todos.push(new Todo({
          id: 1,
          title: 'First todo',
          description: 'This is my first todo',
          author: 'John Doe',
          created_at: '2016-07-01 12:00:00',
          completed_at: null
        }));
        this.saveToLocalStorage();
      }
    }

    this.calculatePaginationArray();
  }

}
