describe('Location', () => {
	beforeEach(() => {
		cy.visit('https://fwd.qa.maqe.com/easy-e-save/product-detail');
	});

	it('cy.url() - get the current URL', () => {
		cy.url().should('eq', 'https://fwd.qa.maqe.com/easy-e-save/product-detail');
	});

	it('cy.location() - get window.location', () => {
		cy.location().should((location) => {
			// cy.log(location);
			expect(location.hash).to.be.empty;
			expect(location.href).to.eq('https://fwd.qa.maqe.com/easy-e-save/product-detail');
		});
	});

	it('cy.hash() - get the current URL hash', () => {
		cy.hash().should('be.empty');

		// Example
		// URL: http://localhost:8000/app/#/users/1
		// cy.hash().should('eq', '#/users/1') // => true
	});
});