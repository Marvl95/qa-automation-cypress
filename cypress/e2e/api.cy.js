/// <reference types="cypress" />

import garagePage from '../support/pages/GaragePage';
import expensesPage from '../support/pages/ExpensesPage';

// API testing (HW 22.1): combine UI actions, request interception and direct
// API calls. State (carId) is shared across the ordered tests, so we disable
// test isolation and log in once.
describe('API testing — cars & expenses', { testIsolation: false }, () => {
  // Unique mileage so the car can be unambiguously matched by UI data in GET /api/cars.
  const car = { brand: 'Audi', model: 'TT', mileage: Cypress._.random(50000, 999999) };
  const carName = `${car.brand} ${car.model}`;

  // Randomized so the created expense is unambiguous in the UI across re-runs.
  const expense = {
    mileage: car.mileage + Cypress._.random(100, 9000),
    liters: Cypress._.random(10, 90),
    totalCost: Cypress._.random(50, 900),
  };

  let carId;

  before(() => {
    cy.visitQauto();
    cy.login(Cypress.env('userEmail'), Cypress.env('userPassword'));
  });

  it('creates a car via UI and captures its id from intercepted POST /api/cars', () => {
    cy.intercept('POST', '/api/cars').as('createCar');

    garagePage.open();
    garagePage.addCar(car.brand, car.model, car.mileage);

    cy.wait('@createCar').then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      expect(response.body.status).to.eq('ok');

      carId = response.body.data.id;
      expect(carId, 'created car id').to.be.a('number');
    });
  });

  it('GET /api/cars returns a list containing the created car', () => {
    cy.getCarsViaApi().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.status).to.eq('ok');

      const found = res.body.data.find((item) => item.id === carId);
      expect(found, `car with id ${carId} present in list`).to.exist;
      expect(found.brand).to.eq(car.brand);
      expect(found.model).to.eq(car.model);
      expect(found.mileage).to.eq(car.mileage);
    });
  });

  it('creates a fuel expense for the car via API and validates the response', () => {
    cy.createExpenseViaApi(carId, expense).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.status).to.eq('ok');

      const created = res.body.data;
      expect(created.carId).to.eq(carId);
      expect(created.reportedAt).to.be.a('string');
      expect(created.mileage).to.eq(expense.mileage);
      expect(created.liters).to.eq(expense.liters);
      expect(created.totalCost).to.eq(expense.totalCost);
    });
  });

  it('finds the car via UI and validates the expense created via API', () => {
    garagePage.open();
    garagePage.assertCarPresent(carName);

    expensesPage.open();
    expensesPage.assertExpensePresent(expense);
  });
});
