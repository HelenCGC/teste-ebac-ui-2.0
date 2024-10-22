///<reference types="cypress" />;

describe("Funcionalidade: Login", () => {
  it("Deve faze login com sucesso", () => {
    cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/");
    cy.get("#username").type("helen.teste@teste.com");
    cy.get("#password").type("@teste123");
    cy.get(".woocommerce-form > .button").click();

    cy.get(".woocommerce-MyAccount-content > :nth-child(2)").should(
      "contain",
      "Olá, helen.teste (não é helen.teste? Sair)"
    );
  });
});
