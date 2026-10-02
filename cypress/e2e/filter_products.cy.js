describe('Prueba End-to-End: Filtrado de Productos (Lección 4)', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('permite al usuario seleccionar una categoría y ver los resultados filtrados', () => {
    // 1. Confirmar la carga inicial de los productos desde products.json
    cy.get('.product-card').should('have.length.greaterThan', 0);

    // 2. Interactuar con el menú selector de categorías
    cy.get('select').select("men's clothing");

    // 3. Verificar que los resultados filtrados estén visibles
    cy.get('.product-card').should('be.visible');
  });
});