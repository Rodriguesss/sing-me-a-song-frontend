/// <reference types="cypress" />

import { recommendationFactory } from "../factories/recommendationFactory";

describe("top page", () => {
  it("should a top reccomendation", () => {
    const path = '/top';
    cy.resetDatabase();

    cy.visit('/');

    cy.create(recommendationFactory);
    
    cy.visit(path);

    cy.url().then($url => {
      expect($url).includes(path);
    });
    
    cy.end();
  });
});