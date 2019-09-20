import React from 'react';
import _ from 'lodash';
import ProspectsTable from 'ui/views/Prospects/ProspectsTable';
import {PROSPECT_COLUMNS} from 'ui/views/Prospects/ProspectsTable';
import {mount} from 'enzyme';
import {generateSampleProspects} from 'samples/prospects';

describe('ProspectsTable', () => {
  it('renders table headers', () => {
    const prospects = generateSampleProspects();

    const rendered = mount(<ProspectsTable prospects={prospects} />);

    const renderedColumns = rendered.find('thead th');

    expect(renderedColumns.length).toEqual(PROSPECT_COLUMNS.length);

    PROSPECT_COLUMNS.forEach((column, index) => {
      expect(renderedColumns.at(index).text()).toEqual(column.label);
    });
  });

  it('renders table body', () => {
    const prospects = generateSampleProspects();

    const rendered = mount(<ProspectsTable prospects={prospects} />);

    const renderedRows = rendered.find('tbody tr');

    expect(renderedRows.length).toEqual(prospects.length);

    prospects.forEach((prospect, rowIndex) => {
      const renderedRow = renderedRows.at(rowIndex);
      const renderedCells = renderedRow.find('td');

      PROSPECT_COLUMNS.forEach((column, columnIndex) => {
        const renderedCellText = renderedCells.at(columnIndex).text();
        const cellContent = column.render(prospect);

        if (_.isString(cellContent) || _.isNumber(cellContent)) {
          expect(renderedCellText).toEqual('' + cellContent);

        } else {
          expect(renderedCellText).toEqual(mount(cellContent).text());
        }
      });
    });
  });

  it('does not render pagination if totalPages is omitted', () => {
    const prospects = generateSampleProspects();

    const rendered = mount(<ProspectsTable prospects={prospects} />);

    const paginationMenu = rendered.find('.ui.pagination');

    expect(paginationMenu.exists()).toEqual(false);
  });

  it('does not render pagination if totalPages is 1', () => {
    const prospects = generateSampleProspects();

    const rendered = mount(
      <ProspectsTable
        prospects={prospects}

        totalPages={1}
        currentPage={1}
      />
    );

    const paginationMenu = rendered.find('.ui.pagination');

    expect(paginationMenu.exists()).toEqual(false);
  });

  it('can render pagination', () => {
    const prospects = generateSampleProspects();

    const rendered = mount(
      <ProspectsTable
        prospects={prospects}

        totalPages={4}
        currentPage={3}
      />
    );

    const activeLink = rendered.find('.ui.pagination a.active[type="pageItem"]');
    expect(activeLink.length).toEqual(1);
    expect(activeLink.at(0).text()).toEqual('3');
  });
});
