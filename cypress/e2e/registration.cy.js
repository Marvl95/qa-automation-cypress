/// <reference types="cypress" />

import { registrationFields, registrationModal } from '../support/selectors';

const validUser = {
  name: 'John',
  lastName: 'Doe',
  password: 'Passw0rd',
};

describe('Registration form', () => {
  beforeEach(() => {
    cy.visitQauto();
    cy.openRegistrationForm();
  });

  context('Form layout', () => {
    it('displays the Registration header', () => {
      cy.get(registrationModal).contains('.modal-title', 'Registration').should('be.visible');
    });

    it('displays all required fields', () => {
      cy.get(registrationFields.name).should('be.visible');
      cy.get(registrationFields.lastName).should('be.visible');
      cy.get(registrationFields.email).should('be.visible');
      cy.get(registrationFields.password).should('be.visible');
      cy.get(registrationFields.repeatPassword).should('be.visible');
    });

    it('keeps Register disabled when the form is empty', () => {
      cy.assertRegisterButtonState(true);
    });
  });

  context('Name field', () => {
    it('shows required error when left empty', () => {
      cy.get(registrationFields.name).focus().blur();
      cy.assertRegistrationFieldError('name', 'Name required');
      cy.assertRegisterButtonState(true);
    });

    it('shows invalid error for non-English characters', () => {
      cy.fillRegistrationForm({ name: 'Іван' });
      cy.blurRegistrationField('name');
      cy.assertRegistrationFieldError('name', 'Name is invalid');
      cy.assertRegisterButtonState(true);
    });

    it('shows length error when shorter than 2 characters', () => {
      cy.fillRegistrationForm({ name: 'A' });
      cy.blurRegistrationField('name');
      cy.assertRegistrationFieldError(
        'name',
        'Name has to be from 2 to 20 characters long',
      );
      cy.assertRegisterButtonState(true);
    });

    it('shows invalid error for surrounding spaces', () => {
      cy.fillRegistrationForm({ name: '  John  ' });
      cy.blurRegistrationField('name');
      cy.assertRegistrationFieldError('name', 'Name is invalid');
      cy.assertRegisterButtonState(true);
    });

    it('shows length error when longer than 20 characters', () => {
      cy.fillRegistrationForm({ name: 'A'.repeat(21) });
      cy.blurRegistrationField('name');
      cy.assertRegistrationFieldError(
        'name',
        'Name has to be from 2 to 20 characters long',
      );
      cy.assertRegisterButtonState(true);
    });

    it('accepts a valid name', () => {
      cy.fillRegistrationForm({ name: 'John' });
      cy.blurRegistrationField('name');
      cy.get(registrationFields.name).should('have.class', 'ng-valid');
    });
  });

  context('Last name field', () => {
    it('shows required error when left empty', () => {
      cy.get(registrationFields.lastName).focus().blur();
      cy.assertRegistrationFieldError('lastName', 'Last name required');
      cy.assertRegisterButtonState(true);
    });

    it('shows invalid error for non-English characters', () => {
      cy.fillRegistrationForm({ lastName: 'Петренко' });
      cy.blurRegistrationField('lastName');
      cy.assertRegistrationFieldError('lastName', 'Last name is invalid');
      cy.assertRegisterButtonState(true);
    });

    it('shows length error when shorter than 2 characters', () => {
      cy.fillRegistrationForm({ lastName: 'B' });
      cy.blurRegistrationField('lastName');
      cy.assertRegistrationFieldError(
        'lastName',
        'Last name has to be from 2 to 20 characters long',
      );
      cy.assertRegisterButtonState(true);
    });

    it('shows length error when longer than 20 characters', () => {
      cy.fillRegistrationForm({ lastName: 'B'.repeat(21) });
      cy.blurRegistrationField('lastName');
      cy.assertRegistrationFieldError(
        'lastName',
        'Last name has to be from 2 to 20 characters long',
      );
      cy.assertRegisterButtonState(true);
    });
  });

  context('Email field', () => {
    it('shows required error when left empty', () => {
      cy.get(registrationFields.email).focus().blur();
      cy.assertRegistrationFieldError('email', 'Email required');
      cy.assertRegisterButtonState(true);
    });

    it('shows incorrect error for invalid email format', () => {
      cy.fillRegistrationForm({ email: 'not-an-email' });
      cy.blurRegistrationField('email');
      cy.assertRegistrationFieldError('email', 'Email is incorrect');
      cy.assertRegisterButtonState(true);
    });
  });

  context('Password field', () => {
    it('shows required error when left empty', () => {
      cy.get(registrationFields.password).focus().blur();
      cy.assertRegistrationFieldError('password', 'Password required');
      cy.assertRegisterButtonState(true);
    });

    it('shows validation error when rules are not met', () => {
      cy.fillRegistrationForm({ password: 'short' });
      cy.blurRegistrationField('password');
      cy.assertRegistrationFieldError(
        'password',
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      );
      cy.assertRegisterButtonState(true);
    });
  });

  context('Re-enter password field', () => {
    it('shows required error when left empty', () => {
      cy.get(registrationFields.repeatPassword).focus().blur();
      cy.assertRegistrationFieldError('repeatPassword', 'Re-enter password required');
      cy.assertRegisterButtonState(true);
    });

    it('shows mismatch error when passwords differ', () => {
      cy.fillRegistrationForm({
        password: validUser.password,
        repeatPassword: 'Different1',
      });
      cy.blurRegistrationField('repeatPassword');
      cy.assertRegistrationFieldError('repeatPassword', 'Passwords do not match');
      cy.assertRegisterButtonState(true);
    });
  });

  context('Successful registration', () => {
    it('creates a new user with valid unique email', () => {
      cy.uniqueRegistrationEmail().then((email) => {
        cy.fillRegistrationForm({
          ...validUser,
          email,
          repeatPassword: validUser.password,
        });

        cy.assertRegisterButtonState(false);
        cy.submitRegistrationForm();

        cy.get(registrationModal).should('not.exist');
      });
    });
  });

  context('Login', () => {
    it('logs in via UI with newly created credentials', () => {
      cy.uniqueRegistrationEmail().then((email) => {
        cy.fillRegistrationForm({
          ...validUser,
          email,
          repeatPassword: validUser.password,
        });
        cy.submitRegistrationForm();
        cy.url().should('include', '/panel/garage');

        cy.logout();

        cy.login(email, validUser.password);
        cy.contains('Garage').should('be.visible');
      });
    });
  });
});
