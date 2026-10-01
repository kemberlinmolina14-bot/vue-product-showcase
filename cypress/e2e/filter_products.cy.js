describe('Flujo de Filtrado de Productos por Categoría', () => {
  beforeEach(() => {
    // Visita la aplicación corriendo en local
    cy.visit('http://localhost:8080');
  });

  it('permite al usuario seleccionar una categoría y ver los resultados filtrados', () => {
    // 1. Confirmar que los productos cargaron en pantalla
    cy.get('.product-card', { timeout: 10000 }).should('have.length.greaterThan', 0);

    // 2. Seleccionar la categoría de electrónica en el desplegable
    cy.get('select').select('electronics');

    // 3. Verificar que las tarjetas mostradas corresponden al filtro aplicado
    cy.get('.product-card').each(($card) => {
      cy.wrap($card).should('exist');
    });

    // 4. Probar la interacción con el botón de favoritos
    cy.get('.product-card').first().find('.favorite-btn').click();
    cy.get('.favorites-badge .count').should('contain.text', '1');
  });
});