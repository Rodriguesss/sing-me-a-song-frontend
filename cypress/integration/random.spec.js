/// <reference types="cypress" />

import { recommendationFactory } from "../factories/recommendationFactory";

describe("random page", () => {
  it("should a random reccomendation", () => {
    const path = '/random';
    cy.resetDatabase();

    cy.visit('/');

    cy.create(recommendationFactory);
    
    cy.contains("Random").click();

    cy.url().then($url => {
      expect($url).includes(path);
    });
    
    cy.end();
  });
});