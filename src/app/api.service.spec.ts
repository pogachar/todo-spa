/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { APIService } from './api.service';

describe('Service: API', () => {
	beforeEach(() => {
		addProviders([APIService]);
	});

	it('should ...',
		inject([APIService],
			(service: APIService) => {
				expect(service).toBeTruthy();
			}));
});
