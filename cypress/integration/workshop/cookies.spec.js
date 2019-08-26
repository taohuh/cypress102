describe('Cookies', () => {
	// https://docs.cypress.io/api/cypress-api/cookies.html
	beforeEach(() => {
		Cypress.Cookies.debug(true);

		cy.visit('https://example.cypress.io/commands/cookies');

		cy.clearCookies();
	});

	it('cy.getCookie() - get a browser cookie', () => {
		// https://on.cypress.io/getcookie
		cy.log('No cookie');

		cy.get('#getCookie .set-a-cookie')
			.click();

		cy.getCookie('token')
			.as('cookies');

		cy.get('@cookies')
			.should('have.property', 'value', '123ABC');

		// check more property
		// domain
		// secure
		// httpOnly

		cy.get('@cookies')
			.should('have.property', 'domain', 'example.cypress.io');
	});

	it('cy.getCookies() - get browser cookies', () => {
		cy.getCookies().should('be.empty');

		cy.get('#getCookie .set-a-cookie')
			.click();

		cy.getCookies('token')
			.should('have.length', 1)
			.should((cookies) => {
				// cy.log('cookies: ', cookies);
				expect(cookies[0]).to.have.property('name', 'token');
			});
	});

	it('cy.setCookie() - set a browser cookie', () => {
		// https://on.cypress.io/setcookie
		cy.setCookie('tao', 'tao value');

		cy.getCookie('tao')
			.should('have.property', 'value', 'tao value');
	});

	it('cy.clearCookie() - clear a browser cookie', () => {
		// https://on.cypress.io/clearcookie
		cy.get('#getCookie .set-a-cookie')
			.click();

		cy.getCookie('token')
			.should('not.be.null');

		cy.clearCookie('token');

		cy.getCookie('token')
			.should('be.null');
	});

	it('cy.clearCookies() - clear browser cookies', () => {
		// https://on.cypress.io/clearcookies
		cy.getCookies()
			.should('be.empty');

		cy.get('#clearCookies .set-a-cookie')
			.click();

		cy.getCookies()
			.should('have.length', 1);

		cy.clearCookies();

		cy.getCookies()
			.should('be.empty');
	});
});