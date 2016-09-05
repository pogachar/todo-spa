import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Todo } from "./todo";

@Injectable()

export class APIService {

  constructor(public http: Http) {}

	apiUrl: string = 'http://192.168.33.10/';

	getTodos (data: Object = {}) {
	  let params = new URLSearchParams();

    for (let key in data) {
      params.set(key, data[key]);
    }

		return this.http.get(this.apiUrl + 'tasks', { search: params });
	}

	getTodo (id) {
    return this.http.get(this.apiUrl + 'tasks/' + id);
  }

	createTodo (todo: Todo) {
    return this.http.post(this.apiUrl + 'tasks', todo);
	}

	updateTodo (todo: Todo) {
	  return this.http.put(this.apiUrl + 'tasks/' + todo.id, todo);
  }

  deleteTodo (todo: Todo) {
    return this.http.delete(this.apiUrl + 'tasks/' + todo.id);
  }

}
