describe('Local Storage', () => {
	beforeEach(() => {
		cy.visit('https://example.cypress.io/commands/local-storage')
	});

	// Although local storage is automatically cleared
  // in between tests to maintain a clean state
	// sometimes we need to clear the local storage manually

	it.only('cy.clearLocalStorage() - clear all data in local storage', () => {
		// https://on.cypress.io/clearlocalstorage
		cy.get('.ls-btn')
			.click()
			.should(() => {
				cy.log(localStorage);
				expect(localStorage.getItem('prop1')).to.eq('red');
				expect(localStorage.getItem('prop2')).to.eq('blue');
				expect(localStorage.getItem('prop3')).to.eq('magenta');
			});

		// clearLocalStorage() yields the localStorage object
		cy.clearLocalStorage().should((localStorage) => {
			expect(localStorage).to.have.length(0);
			expect(localStorage.getItem('prop1')).to.be.null;
		});

		cy.get('.ls-btn')
			.click();

		// Clear key matching string in Local Storage
		cy.clearLocalStorage('prop1').should((localStorage) => {
			expect(localStorage.getItem('prop1')).to.be.null;
			expect(localStorage.getItem('prop2')).to.be.eq('blue');
			expect(localStorage.getItem('prop3')).to.be.eq('magenta');
		});

		cy.get('.ls-btn')
			.click();

		// Clear keys matching regex in Local Storage
		cy.clearLocalStorage(/prop2|3/).should((localStorage) => {
			expect(localStorage.getItem('prop1')).to.be.eq('red');
			expect(localStorage.getItem('prop2')).to.be.null;
			expect(localStorage.getItem('prop3')).to.be.null;
		});
	});
});