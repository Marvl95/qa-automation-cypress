/// <reference types="cypress" />

import garagePage from '../support/pages/GaragePage';
import expensesPage from '../support/pages/ExpensesPage';

describe('Garage and fuel expenses', () => {
  beforeEach(() => {
    cy.visitQauto();
    cy.login(Cypress.env('userEmail'), Cypress.env('userPassword'));
  });

  it('adds a car to the garage', () => {
    garagePage.addCar('Audi', 'TT', 150);
    garagePage.assertCarPresent('Audi TT');
  });

  it('adds a fuel expense to the created car', () => {
    const expense = { mileage: 250, liters: 40, totalCost: 80 };

    garagePage.addCar('Ford', 'Fusion', 200);

    expensesPage.open();
    expensesPage.addExpense(expense);
    expensesPage.assertExpensePresent(expense);
  });
});
