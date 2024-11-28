///<reference types="cypress" />;
const perfil = require("../../fixtures/perfil.json");

describe("Funcionalidade: Login", () => {
  beforeEach(() => {
    cy.visit("minha-conta");
  });

  afterEach(() => {
    cy.screenshot();
  });

  it("Deve faze login com sucesso", () => {
    cy.get("#username").type("helen.teste@teste.com");
    cy.get("#password").type("@teste123");
    cy.get(".woocommerce-form > .button").click();

    cy.get(".woocommerce-MyAccount-content > :nth-child(2)").should(
      "contain",
      "Olá, helen.qa (não é helen.qa? Sair)"
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

  it("Deve fazer login com sucesso - Usando massa de dados", () => {
    cy.get("#username").type(perfil.usuario);
    cy.get("#password").type(perfil.senha);
    cy.get(".woocommerce-form > .button").click();

    cy.get(".woocommerce-MyAccount-content > :nth-child(2)").should(
      "contain",
      "Olá, helen.qa (não é helen.qa? Sair)"
    );
  });
  it("Deve fazer login com sucesso - Usando Fixture", () => {
    cy.fixture("perfil").then((dados) => {
      cy.get("#username").type(dados.usuario, { log: false });
      cy.get("#password").type(dados.senha, { log: false });
      cy.get(".woocommerce-form > .button").click();

      cy.get(".woocommerce-MyAccount-content > :nth-child(2)").should(
        "contain",
        "Olá, helen.qa (não é helen.qa? Sair)"
      );
    });
  });
  it.only("Deve fazer login com sucesso - usando Comandos customizados", () => {
    cy.login("helen.teste@teste.com", "@teste123");
    cy.get(".woocommerce-MyAccount-content > :nth-child(2)").should(
      "contain",
      "Olá, helen.qa (não é helen.qa? Sair)"
    );
  });
});
