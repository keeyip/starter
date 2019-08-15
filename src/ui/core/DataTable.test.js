import React from 'react';
import DataTable from 'ui/core/DataTable';
import {mount} from 'enzyme';

describe('DataTable', () => {
  it('renders table headers', () => {
    const items = [
      {name: 'Bob', age: 30},
      {name: 'Rose', age: 31},
      {name: 'Jill', age: 32},
      {name: 'Jane', age: 33},
    ];

    const columns = [
      {key: 'name', label: 'Name', render: item => item.name},
      {key: 'age', label: 'Age', render: item => item.age},
    ];

    const rendered = mount(
      <DataTable
        items={items}
        getRowKey={item => item.name}
        columns={columns}
      />
    );

    const renderedColumns = rendered.find('thead th');

    expect(renderedColumns.length).toEqual(2);

    columns.forEach((column, index) => {
      expect(renderedColumns.at(index).text()).toEqual(column.label);
    });
  });

  it('renders table body', () => {
    const items = [
      {name: 'Bob', age: 30},
      {name: 'Rose', age: 31},
      {name: 'Jill', age: 32},
      {name: 'Jane', age: 33},
    ];

    const columns = [
      {key: 'name', label: 'Name', render: item => item.name},
      {key: 'age', label: 'Age', render: item => item.age},
    ];

    const rendered = mount(
      <DataTable
        items={items}
        getRowKey={item => item.name}
        columns={columns}
      />
    );

    const renderedRows = rendered.find('tbody tr');

    expect(renderedRows.length).toEqual(4);

    items.forEach((item, rowIndex) => {
      const renderedRow = renderedRows.at(rowIndex);
      const renderedCells = renderedRow.find('td');

      columns.forEach((column, columnIndex) => {
        expect(renderedCells.at(columnIndex).text()).toEqual('' + column.render(item));
      });
    });
  });

  it('does not render pagination if totalPages is omitted', () => {
    const items = [
      {name: 'Bob', age: 30},
      {name: 'Rose', age: 31},
      {name: 'Jill', age: 32},
      {name: 'Jane', age: 33},
    ];

    const columns = [
      {key: 'name', label: 'Name', render: item => item.name},
      {key: 'age', label: 'Age', render: item => item.age},
    ];

    const rendered = mount(
      <DataTable
        items={items}
        getRowKey={item => item.name}
        columns={columns}
      />
    );

    const paginationMenu = rendered.find('.ui.pagination');

    expect(paginationMenu.exists()).toEqual(false);
  });

  it('does not render pagination if totalPages is 1', () => {
    const items = [
      {name: 'Bob', age: 30},
      {name: 'Rose', age: 31},
      {name: 'Jill', age: 32},
      {name: 'Jane', age: 33},
    ];

    const columns = [
      {key: 'name', label: 'Name', render: item => item.name},
      {key: 'age', label: 'Age', render: item => item.age},
    ];

    const rendered = mount(
      <DataTable
        items={items}
        getRowKey={item => item.name}
        columns={columns}

        totalPages={1}
        currentPage={1}
      />
    );

    const paginationMenu = rendered.find('.ui.pagination');

    expect(paginationMenu.exists()).toEqual(false);
  });

  it('can render pagination', () => {
    const items = [
      {name: 'Bob', age: 30},
      {name: 'Rose', age: 31},
      {name: 'Jill', age: 32},
      {name: 'Jane', age: 33},
    ];

    const columns = [
      {key: 'name', label: 'Name', render: item => item.name},
      {key: 'age', label: 'Age', render: item => item.age},
    ];

    const rendered = mount(
      <DataTable
        items={items}
        getRowKey={item => item.name}
        columns={columns}

        totalPages={4}
        currentPage={3}
      />
    );

    const activeLink = rendered.find('.ui.pagination a.active[type="pageItem"]');
    expect(activeLink.length).toEqual(1);
    expect(activeLink.at(0).text()).toEqual('3');
  });
});
