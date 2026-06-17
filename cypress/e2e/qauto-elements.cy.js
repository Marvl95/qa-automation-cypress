/// <reference types="cypress" />

const headerControls = ['Home', 'About', 'Contacts', 'Guest log in', 'Sign In'];

// The visual "footer" block (Contacts + socials + links) lives in
// <div id="contactsSection" class="section contacts">, not in the <footer> tag.
const contactsArea = '#contactsSection';

const footerSocials = [
  { name: 'Facebook', hrefPart: 'facebook.com' },
  { name: 'Telegram', hrefPart: 't.me/' },
  { name: 'YouTube', hrefPart: 'youtube.com' },
  { name: 'Instagram', hrefPart: 'instagram.com' },
  { name: 'LinkedIn', hrefPart: 'linkedin.com' },
];

describe('qauto — header & footer elements', () => {
  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: Cypress.env('basicAuthUsername'),
        password: Cypress.env('basicAuthPassword'),
      },
    });
  });

  context('Header', () => {
    it('renders the header', () => {
      cy.get('header').should('be.visible');
    });

    headerControls.forEach((label) => {
      it(`finds the "${label}" control in the header`, () => {
        cy.get('header').contains('a, button', label).should('be.visible');
      });
    });
  });

  context('Footer (contacts area)', () => {
    it('renders the contacts area', () => {
      cy.get(contactsArea).should('be.visible');
    });

    footerSocials.forEach(({ name, hrefPart }) => {
      it(`finds the ${name} social link`, () => {
        cy.get(contactsArea)
          .find(`a[href*="${hrefPart}"]`)
          .should('be.visible')
          .and('have.attr', 'target', '_blank');
      });
    });

    it('finds the ithillel.ua website link', () => {
      cy.get(contactsArea)
        .find('a[href*="ithillel.ua"]')
        .not('[href*="mailto"]')
        .should('be.visible')
        .and('contain', 'ithillel.ua');
    });

    it('finds the support email link', () => {
      cy.get(contactsArea)
        .contains('a', 'support@ithillel.ua')
        .should('have.attr', 'href')
        .and('include', 'mailto:');
    });
  });
});
