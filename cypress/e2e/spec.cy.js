describe('test case', () => {
  const username = Cypress.env('USERNAME');
  const password = Cypress.env('PASSWORD');

  it('Finds the cheapest item and verifies it in cart', () => {
    cy.visit('/');
    cy.get('#user-name').type(username);
    cy.get('#password').type(password);
    cy.get('#login-button').click();

    cy.get('[data-test="product-sort-container"]').as('sort').should('exist');

    cy.get('@sort').select('lohi');

    cy.get('@sort').should(
      'have.value',
      'lohi',
      'ERROR: Price Low-High filter not applied'
    );
    cy.get('.inventory_item')
      .first()
      .within(() => {
        cy.get('.inventory_item_name').invoke('text').as('productName');

        cy.get('.inventory_item_price').invoke('text').as('productPrice');
        cy.contains('Add to cart').click();
      });

    cy.get('@productName').then((productName) => {
      cy.get('@productPrice').then((productPrice) => {
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        cy.get('.inventory_item_name')
          .first()
          .should(
            'contain',
            productName.trim(),
            'ERROR: item name in cart does not match selected'
          );
        cy.get('.inventory_item_price')
          .first()
          .should(
            'contain',
            productPrice.trim(),
            'ERROR: item price in cart does not match selected'
          );

        cy.get('#checkout').click();
        cy.get('#first-name').type('Test');
        cy.get('#last-name').type('User');
        cy.get('#postal-code').type('10101');
        cy.get('#continue').click();

        cy.url().should('include', '/checkout-step-two.html');
        cy.get('.cart_item .inventory_item_name')
          .first()
          .should(
            'contain',
            productName.trim(),
            'ERROR: Checkout item does not match selected'
          );
        cy.get('.cart_item .inventory_item_price')
          .first()
          .should(
            'contain',
            productPrice.trim(),
            'ERROR: Checkout price does not match selected'
          );
      });
    });
    cy.get('#finish').click();
    cy.get('.complete-header').should(
      'contain',
      'Thank you for your order!',
      'ERROR: order success message not shown'
    );
  });
});
