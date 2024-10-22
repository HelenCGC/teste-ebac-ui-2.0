///<reference types="cypress" />;

describe("Funcionalidade: Login", () => {
  beforeEach(() => {
    cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/");
  });

  //afterEach(() => {    cy.screenshot();  });

  it("Deve faze login com sucesso", () => {
    cy.get("#username").type("helen.teste@teste.com");
    cy.get("#password").type("@teste123");
    cy.get(".woocommerce-form > .button").click();

    cy.get(".woocommerce-MyAccount-content > :nth-child(2)").should(
      "contain",
      "Olá, helen.teste (não é helen.teste? Sair)"
    );
  });

  it("Deve exibir uma mensagem de erro ao insierir usuário inválido", () => {
    cy.get("#username").type("qualquer.erro@teste.com");
    cy.get("#password").type("@teste123");
    cy.get(".woocommerce-form > .button").click();

    //cy.get(".woocommerce-error").should("contain", "Endereço de e-mail desconhecido.");
    cy.get(".woocommerce-error").should("exist");
  });

  it("Deve exibir uma mensagem de erro ao insierir senha inválida", () => {
    cy.get("#username").type("helen.teste@teste.com");
    cy.get("#password").type("@erro00");
    cy.get(".woocommerce-form > .button").click();

    cy.get(".woocommerce-error").should(
      "contain",
      "Erro: A senha fornecida para o e-mail helen.teste@teste.com está incorreta. Perdeu a senha?"
    );
    cy.get(".woocommerce-error").should("exist");
  });
});
