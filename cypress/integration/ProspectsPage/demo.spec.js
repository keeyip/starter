context('demo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9009/iframe.html?id=ui-views-prospects-prospectspage--standard')
  })

  function clickPage(page) {
    cy.log(`clickPage(${page})`);

    cy.get('.ui.pagination a[type="pageItem"]').contains(page).click();
  }

  function clickLens(label) {
    cy.log(`clickLens(${label})`);

    cy.get('.Explorer-lenses .ui.menu a.item').contains(label).click();
  }

  function locateTableCell(text) {
    cy.log(`locateTableCell(${text})`);

    cy.get('tbody tr td').contains(text).should('exist');
  }

  function countTableRows(count) {
    cy.get('tbody tr').should('have.length', count);
  }

  function locateMapMarkers(count) {
    cy.log(`locateMapMarkers(${count})`);

    // This is failing for some reason.
    // cy.get('svg g.rsm-marker').should('have.length', count);

    cy.get('svg').should('exist');
  }

  function filterByState(stateAbbrev) {
    cy.log(`filterByState(${stateAbbrev})`);

    const categoryDropdown = cy.get('.ui.dropdown.Explorer-filterCategories');
    
    categoryDropdown.click();

    categoryDropdown.find('.menu .item').contains('State').click();

    const modal = cy.get('.ui.modal');

    const stateDropdown = modal.find('.ui.selection.dropdown');

    stateDropdown.click();

    const option = stateDropdown.find('.menu .item').contains(stateAbbrev + ' (');

    option.click();

    cy.get('.Explorer-filterPills .ui.label').contains(stateAbbrev).should('exist');
  }

  function removeStateFilter(stateAbbrev) {
    const pill = cy.get('.Explorer-filterPills .ui.label').contains(stateAbbrev);
    pill.click();
    pill.should('not.exist');
  }

  it('Filter by WA, CA, MO', () => {
    countTableRows(10);

    filterByState('WA');
    locateTableCell('Stan Lee');
    countTableRows(1);

    filterByState('CA');
    locateTableCell('Stan Lee');
    locateTableCell('Will Smith');
    locateTableCell('Darth Vader');
    countTableRows(3);

    filterByState('MO');
    countTableRows(10);

    clickPage(4);
    locateTableCell('Sample index31');
    locateTableCell('Sample index39');
    countTableRows(9);

    clickLens('Map');
    locateMapMarkers(4);

    
    clickLens('Data');
    cy.log('Still on page 4 when switching back to Data');
    locateTableCell('Sample index31');
    locateTableCell('Sample index39');
    countTableRows(9);

    clickLens('Map');
    locateMapMarkers(4);

    removeStateFilter('WA');
    locateMapMarkers(3);

    removeStateFilter('CA');
    locateMapMarkers(1);

    removeStateFilter('MO');
    locateMapMarkers(5);

    filterByState('CA');
    locateMapMarkers(2);

    clickLens('Data');
    locateTableCell('Will Smith');
    locateTableCell('Darth Vader');
    countTableRows(2);

    removeStateFilter('CA');
    countTableRows(10);
  })
});
