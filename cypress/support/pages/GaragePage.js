const modal = '.modal-content';

class GaragePage {
  url = '/panel/garage';

  selectors = {
    addCarButton: 'button.btn-primary',
    brandSelect: '#addCarBrand',
    modelSelect: '#addCarModel',
    mileageInput: '#addCarMileage',
    submitButton: `${modal} .modal-footer .btn-primary`,
    carName: '.car_name',
  };

  open() {
    cy.visit(this.url);
    return this;
  }

  clickAddCar() {
    cy.contains('button', 'Add car').click();
    cy.get(modal).should('be.visible');
    return this;
  }

  addCar(brand, model, mileage) {
    this.clickAddCar();
    cy.get(this.selectors.brandSelect).select(brand);
    cy.get(this.selectors.modelSelect).select(model);
    cy.get(this.selectors.mileageInput).clear().type(String(mileage));
    cy.get(modal).contains('button', 'Add').click();
    cy.get(modal).should('not.exist');
    return this;
  }

  assertCarPresent(name) {
    cy.get(this.selectors.carName).should('contain', name);
    return this;
  }
}

export default new GaragePage();
