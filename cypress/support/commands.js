import {
  garagePage,
  registrationButtons,
  registrationFields,
  registrationModal,
  signInButtons,
  signInFields,
  signInModal,
} from './selectors';

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});

// Inject HTTP basic auth (guest/welcome2qauto) into every visit so direct page
// navigations (incl. Page Objects) pass the qauto auth gate.
Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
  const auth = {
    username: Cypress.env('basicAuthUsername'),
    password: Cypress.env('basicAuthPassword'),
  };

  return originalFn(url, { auth, ...options });
});

Cypress.Commands.add('visitQauto', (path = '/') => {
  cy.visit(path);
});

Cypress.Commands.add('openRegistrationForm', () => {
  cy.contains('button, a', 'Sign up').click();
  cy.get(registrationModal).should('be.visible');
  cy.get(registrationModal).contains('.modal-title', 'Registration').should('be.visible');
});

Cypress.Commands.add(
  'fillRegistrationForm',
  ({ name, lastName, email, password, repeatPassword } = {}) => {
    const fields = [
      [registrationFields.name, name, false],
      [registrationFields.lastName, lastName, false],
      [registrationFields.email, email, false],
      [registrationFields.password, password, true],
      [registrationFields.repeatPassword, repeatPassword, true],
    ];

    fields.forEach(([selector, value, sensitive]) => {
      if (value !== undefined) {
        cy.get(selector).clear().type(value, { delay: 0, sensitive });
      }
    });
  },
);

Cypress.Commands.add('blurRegistrationField', (fieldKey) => {
  cy.get(registrationFields[fieldKey]).blur();
});

Cypress.Commands.add('assertRegistrationFieldError', (fieldKey, message) => {
  const selector = registrationFields[fieldKey];

  cy.get(selector)
    .should('have.class', 'is-invalid')
    .and('have.class', 'ng-touched')
    .and('have.css', 'border-color', 'rgb(220, 53, 69)');

  cy.get(registrationModal).contains(message).should('be.visible');
});

Cypress.Commands.add('assertRegisterButtonState', (disabled) => {
  cy.get(registrationButtons.register)
    .contains('Register')
    .should(disabled ? 'be.disabled' : 'not.be.disabled');
});

Cypress.Commands.add('submitRegistrationForm', () => {
  cy.get(registrationButtons.register).contains('Register').click();
});

Cypress.Commands.add('uniqueRegistrationEmail', (prefix = 'cypress') => {
  return `${prefix}.${Date.now()}@test.com`;
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('header').contains('a, button', 'Sign In').click();
  cy.get(signInModal).should('be.visible');
  cy.get(signInModal).contains('.modal-title', 'Log in').should('be.visible');

  cy.get(signInFields.email).clear().type(email, { delay: 0 });
  cy.get(signInFields.password).clear().type(password, { delay: 0, sensitive: true });

  cy.get(signInButtons.login).contains('Login').click();

  cy.url().should('include', '/panel/garage');
});

Cypress.Commands.add('logout', () => {
  cy.get(garagePage.logoutButton).contains('Log out').click();
  cy.get('header').contains('a, button', 'Sign In').should('be.visible');
});
