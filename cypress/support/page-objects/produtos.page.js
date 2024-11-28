class ProdutosPage {
  visitarURL() {
    cy.visit("produtos");
  }

  buscarProduto(nomeProduto) {
    cy.get('[name="s"]').eq(1).type(nomeProduto);
    cy.get(".button-search").eq(1).click();
  }

  buscarProdutoLista(nomeProduto) {
    cy.get(".product-block").contains(nomeProduto).click();
  }

  visitarProduto(nomeProduto) {
    //metodo simples
    //cy.visit(`produtos/${nomeProduto}`)

    const urlFormatada = nomeProduto.replace(/ /g, '-') //preenche os espaços com hifen(-) na url
    cy.visit(`produtos/${urlFormatada}`)


  }

  addProdutoCarrinho(tamanho, cor, quantidade ) {
    cy.get('.button-variable-item-' + tamanho).click()
    //cy.get('.button-variable-item-M').click()
    //cy.get('li[title=M]').click()
    cy.get(`li[title=${tamanho}]`).click()
    //cy.get('.button-variable-item-Blue').click()
    cy.get('.button-variable-item-' + cor).click()
    //cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item');
    cy.get('.input-text').clear().type(quantidade)
    //cy.get('.single_add_to_cart_button').click()
    cy.get('button[type=submit]').contains('Comprar').click()
  }
}

export default new ProdutosPage();
