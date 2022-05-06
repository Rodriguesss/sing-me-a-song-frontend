/// <reference types="cypress" />

import { recommendationFactory } from "../factories/recommendationFactory";

const url = `${Cypress.config().baseUrl}`;

describe("register recommendation", () => {
  it("should a new reccomendation", () => {
    cy.resetDatabase();

    cy.visit('/');
    cy.create(recommendationFactory);
    cy.reloadAndCheckTitle(recommendationFactory);
  });

  it("should return an error alert", () => {
    cy.visit(url);
    cy.create(recommendationFactory);
    cy.captureAlert("Error creating recommendation!");
    cy.reloadAndCheckTitle(recommendationFactory);
  });

  it("should return an error alert", () => {
    cy.visit(url);
    cy.get("button").click();
    cy.captureAlert("Error creating recommendation!");
    cy.end();
  });
});

describe("clicking the arrows to like and dislike", () => {
  beforeEach(() => {
    cy.resetDatabase();
    cy.create(recommendationFactory);
  });

  it("should have the score number increased", () => {
    cy.visit(url);
    const upVote = true;

    cy.clickOnSvgArrowArticle(recommendationFactory.title, upVote);
  });

  it("should have the score number decremented", () => {
    cy.visit(url);
    const downVote = false;

    cy.clickOnSvgArrowArticle(recommendationFactory.title, downVote);
  });
});