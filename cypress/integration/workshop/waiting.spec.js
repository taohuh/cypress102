describe('Waiting', () => {
	beforeEach(() => {
		cy.visit('https://fwd.qa.maqe.com/easy-e-save/premium-calculator');
	});

	// BE CAREFUL of adding unnecessary wait times.
  // https://on.cypress.io/best-practices#Unnecessary-Waiting

  // https://on.cypress.io/wait
	it('cy.wait() - wait for a specific amount of time', () => {
		cy.get('[name="dateOfBirth"]')
			.eq(0)
			.focus()
			.type('12');

		cy.wait(1000);

		cy.get('[name="dateOfBirth"]')
			.eq(1)
			.focus()
			.type('7');

		cy.wait(1000);

		cy.get('[name="dateOfBirth"]')
			.eq(2)
			.focus()
			.type('2537');
	});

	it('cy.wait() - wait for a specific route', () => {
		cy.server();

		cy.route('GET', 'api/quotationResult?birthDate=12/07/1994&gender=FEMALE&premium=20000')
			.as('getQuotationResult');

		cy.get('.icon-female')
			.click();

		cy.get('[name="dateOfBirth"]')
			.eq(0)
			.focus()
			.type('12');

		cy.get('[name="dateOfBirth"]')
			.eq(1)
			.focus()
			.type('7');

		cy.get('[name="dateOfBirth"]')
			.eq(2)
			.focus()
			.type('2537');

		cy.get('[type="submit"]')
			.click();

		cy.wait('@getQuotationResult')
			.its('status')
			.should('eq', 200);
	});
});