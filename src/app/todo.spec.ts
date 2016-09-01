/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import {Todo} from './todo';

describe('Todo', () => {
	it('should create an instance', () => {
		expect(new Todo()).toBeTruthy();
	});

	it('should accept values in the constructor', () => {
		let todo = new Todo({
			id: 1,
			title: 'My first task',
			description: 'Lorem ipsum dolor.',
			author: 'John Doe',
			created_at: '2016-01-01 12:00:00',
			completed_at: '2016-01-23 16:04:44'
		});

		expect(todo.id).toEqual(1);
		expect(todo.title).toEqual('My first task');
		expect(todo.description).toEqual('Lorem ipsum dolor.');
		expect(todo.author).toEqual('John Doe');
		expect(todo.created_at).toEqual('2016-01-01 12:00:00');
		expect(todo.completed_at).toEqual('2016-01-23 16:04:44');
	})
});
