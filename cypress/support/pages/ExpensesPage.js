const modal = '.modal-content';

class ExpensesPage {
  url = '/panel/expenses';

  selectors = {
    addExpenseButton: 'button.btn-primary',
    carSelect: '#addExpenseCar',
    dateInput: '#addExpenseDate',
    mileageInput: '#addExpenseMileage',
    litersInput: '#addExpenseLiters',
    totalCostInput: '#addExpenseTotalCost',
    submitButton: `${modal} .modal-footer .btn-primary`,
  };

  open() {
    cy.visit(this.url);
    return this;
  }

  clickAddExpense() {
    cy.contains('button', 'Add an expense').click();
    cy.get(modal).should('be.visible');
    return this;
  }

  addExpense({ mileage, liters, totalCost }) {
    this.clickAddExpense();
    cy.get(this.selectors.mileageInput).clear().type(String(mileage));
    cy.get(this.selectors.litersInput).clear().type(String(liters));
    cy.get(this.selectors.totalCostInput).clear().type(String(totalCost));
    cy.get(modal).contains('button', 'Add').click();
    cy.get(modal).should('not.exist');
    return this;
  }

  assertExpensePresent({ mileage, liters, totalCost }) {
    cy.contains('table.expenses_table tbody tr', `${liters}L`)
      .should('be.visible')
      .and('contain', String(mileage))
      .and('contain', String(totalCost));
    return this;
  }
}

export default new ExpensesPage();
