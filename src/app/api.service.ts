import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';

import { Todo } from "./todo";

@Injectable()

export class APIService {

	apiUrl: string = 'http://192.168.33.10/';

	// constructor(private http: Http) { }
	//constructor(private _http: Http) { }

	getTodos(data: Object = {}): APIService {
		return this;
	}

	addTodo(todo: Todo): APIService {
		// this._http.post(this.apiUrl + 'todo', todo);
		return this;
	}

}
