/// <reference types="cypress" />

describe("login page", () => {
  beforeEach(() => {
    cy.visit("https://bit.ly/petsmart-e3");
  });

  it("displays the login form", () => {
    cy.contains("Sign in to PetSmart");
  });

  it("throw error for invalid credentials", () => {
    cy.get("#email").type("johndoe@gmail.com");
    cy.get("#password").clear();
    cy.get("#password").type("abc");
    cy.get('#\\:r2\\:').click();
    cy.contains("Hello").should('not.exist');
  });

  it("can sign in with correct credentials", () => {
    cy.get("#email").type("johndoe@gmail.com");
    cy.get("#password").clear();
    cy.get("#password").type("password");
    cy.get('#\\:r2\\:').click();
    cy.contains("Hello, John")
  });

  it("can go to signup form", () => {
    cy.contains("Get started").click();
    cy.contains("Sign up to PetSmart");
  });
});
