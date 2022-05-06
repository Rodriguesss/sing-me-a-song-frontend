Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", 'http://localhost:5000/tests');
});

Cypress.Commands.add("create", ({ title, link }) => {
  cy.get("input[placeholder='Name']").type(title);
  cy.get("input[placeholder='https://youtu.be/...'").type(link);

  cy.intercept("POST", "/recommendations").as("postRecommendation");
  cy.get("button").click();
  cy.wait("@postRecommendation");
  cy.contains(title).should("be.visible");
});

Cypress.Commands.add("captureAlert", (message) => {
  cy.on('window:alert', (str) => {
    expect(str).to.equal(message);
  });
});

Cypress.Commands.add("clickOnSvgArrowArticle", (containsObject, vote) => {
  cy.contains(containsObject).get("article").first().as('Article');

  cy.get("@Article").find("svg").as("Svg");
  cy.get("@Article").find("div:nth-child(3)").as("Score");

  cy.get("@Score").contains('0');

  vote ? cy.get("@Svg").first().click() : cy.get("@Svg").last().click();

  const scoreDefault = 0;
  checkScore(scoreDefault, vote);

  cy.end();
});

Cypress.Commands.add("reloadAndCheckTitle", ({ title }) => {
  cy.reload();
  cy.contains(title).should("be.visible");
  cy.end();
});

function checkScore(scoreDefault, vote) {
  const score = eval(`${scoreDefault} ${vote ? '+' : '-'} 1`);

  cy.get("@Score").contains(score);
  cy.reload();
  cy.get("@Score").contains(score);
}