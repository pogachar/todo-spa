export class Todo {
	id: number;
	title: string;
	description: string;
	author: string;
	created_at: string;
	completed_at: string;

	constructor (values: Object = {}) {
		Object.assign(this, values);
	}
}
