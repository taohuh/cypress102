describe('Connectors', () => {
	beforeEach(() => {
		cy.visit('https://example.cypress.io/commands/connectors');
	});

	it('.each() - iterate over an array of elements', () => {
		// https://on.cypress.io/each

		cy.get('.connectors-each-ul > li')
			.each(($el, index, $list) => {
				cy.log($el);
				cy.log($el.text());
				cy.log(index);
				cy.log($list);
			});
	});

	it('.its() - get properties on the currentr subject', () => {
		// https://on.cypress.io/its

		cy.get('.connectors-its-ul > li')
			.its('length')
			.should('be.eq', 3);
	});

	it.only('.invoke() - invoke a function on the current subject', () => {
		// our div is hidden in our script.js
		// $('.connectors-div').hide()
		cy.get('.connectors-div')
			.should('be.hidden');

		// https://on.cypress.io/invoke
		// call the jquery method 'show' on the 'div.container'
		cy.get('.connectors-div')
			.invoke('show')
			.should('be.visible');

		//TODO: use invoke for hide connectors-div and assert it
	});

	it('.then() - invoke a callback function with the current subject', () => {
		// https://on.cypress.io/then
		cy.get('.connectors-list > li')
			.then(($lis) => {
				expect($lis, '3 items').to.have.length(3);
				expect($lis.eq(0), 'first item').to.contain('Walk the dog');
				//TODO: expect more li
			});

		cy.get('.connectors-list')
			.then(($connectors) => {
				expect($connectors).to.have.length(1);
			});
	});

	it('.spread() - spread an array as individual args to callback function', () => {
		// https://on.cypress.io/spread

		const array = ['tao', 'pui', 'todz', 'benz'];

		cy.wrap(array).spread((a, b, c) => {
			expect(a).to.eq('tao');
			expect(b).to.eq('pui');
			expect(c).to.eq('todz');
		});

		// Can't spread a object
		const obj = {
			name: 'Tao'
		};
		cy.wrap(obj).spread((obj) => {
			cy.log(obj);
		});
	});
});