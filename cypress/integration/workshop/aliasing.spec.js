describe('Aliasing', () => {
	// .as() - alias a DOM element for later use
	it('Can open modal graph correctly', () => {
		cy.visit('https://fwd.qa.maqe.com/easy-e-save/product-detail');
		// https://on.cypress.io/as

		cy.get('.product-benefit-table .btn-submit.mobile')
			.as('btnOpenGraph');

		cy.get('@btnOpenGraph')
			.click();
	});

	it('.as() - alias a route for later use', () => {
		// Alias the route to wait for its response
		cy.server();

		cy.route('GET', 'api/quotationResult?birthDate=12/07/1994&gender=FEMALE&premium=20000')
			.as('getQuotationResult');

		cy.visit('https://fwd.qa.maqe.com/easy-e-save/premium-calculator');
	});
});