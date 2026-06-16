/// <reference types="cypress" />

describe('Cypress setup smoke test', () => {
  it('loads the Cypress example home page', () => {
    cy.visit('/');
    cy.title().should('include', 'Cypress.io');
    cy.contains('h1', 'Kitchen Sink').should('be.visible');
  });

  it('interacts with elements on the querying page', () => {
    cy.visit('/commands/querying');
    cy.get('#query-btn').should('be.visible').and('contain', 'Button');
  });
});
