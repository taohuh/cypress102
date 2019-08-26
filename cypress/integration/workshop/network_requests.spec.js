describe('Network Requests', () => {
	beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/network-requests')
	});

	it('cy.server() - control behavior of network requests and responses', () => {
		cy.server().should((server) => {
			// cy.log(server);

			expect(server.delay).to.eq(0);
			//TODO: expect other options
			// method
			// status
			// headers
			// response
			// anable
			// force404
			// whitelist
		});

		// override the defaults options.
		cy.server({
			method: 'POST',
			delay: 1000,
			status: 422,
			response: {}
		})
		.should((server) => {
			cy.log('server2: ', server);
		});
	});

	it('cy.request() - make an XHR request', () => {
		// https://on.cypress.io/request
		cy.request('https://jsonplaceholder.cypress.io/comments')
			.should((response) => {
				cy.log(response);

				//TODO: expect response
				// status 200
				// body length 500
				// property - headers
				expect(response).to.have.property('headers');
				// property - duration
				// property - statusText
			});
	});

	it('cy.request() with query parameters', () => {
		// will execute request
		// https://jsonplaceholder.cypress.io/comments?postId=1&id=3
		cy.request({
			url: 'https://jsonplaceholder.cypress.io/comments',
			qs: {
				postId: 1,
				id: 3
			}
		})
		.its('body')
		.should('be.an', 'array')
		.and('have.length', 1)
		.its('0')
		.should('contain', {
			postId: 1
			//TODO: Check value of each keys
			// email
			// name
			// id
		});
	});

	it('cy.request() - pass result to the second request', () => {
		cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
			.its('body.0')
			.then((user) => {
				expect(user).property('id').to.be.a('number');

				cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
					userId: user.id,
					title: 'Cypress Test Runner',
					body: 'I am body'
				});
			})
			.then((response) => {
				cy.log('response: ', response);

				//TODO: Expect value of property from 2nd request
				// eg. expect(response).property('key')...
				// status
				// statusText
				// body contain id, title
				// userId to be a number
			});
	});

	it.only('cy.route() - route responses to matching requests', () => {
		// https://on.cypress.io/route

		let message = 'whoa, this comment does not exist'

		cy.server();
		cy.route('GET', 'comments/*')
			.as('getComment');

		cy.get('.network-btn')
			.click();

		cy.wait('@getComment')
			.its('status')
			.should('eq', 200);

		cy.route('POST', '/comments')
			.as('postComment');

		cy.get('.network-post')
			.click();
		cy.wait('@postComment');

		cy.get('@postComment')
			.should((xhr) => {
				expect(xhr.requestBody).to.include('email');

				//TODO: expect
				// requestHeaders to have property 'Content-Type'
				// responseBody to have property {'name', 'Using POST in cy.route()'}
			});

		// Stub a response to PUT comments/ ****
		cy.route({
			method: 'PUT',
			url: 'comments/*',
			status: 404,
			response: { error: message },
			delay: 500
		}).as('putComment');

		cy.get('.network-put')
			.click();

		cy.wait('@putComment');

		cy.get('.network-put-comment')
			.should('contain', message)
	});

	// Advance
	// it('cy.request() - save response in the shared test context', () => {
	// });
});