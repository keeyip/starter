import React from 'react';
import Paginator from 'ui/core/Paginator';
import {Table} from 'semantic-ui-react';

/**
  Customizable data table with pagination.

  Takes an array of columns that are individually responsible
  for rendering cell values, ie: `column.render(item)`.

  @required
  @prop items: [
    opague data,
    ...
  ]

  @required
  @prop getRowKey: (item) => React key for a given row

  @required
  @prop columns: [
    {
      @required
      @member key: React key for this column

      @required
      @member label: string or React element

      @required
      @member render: (item) => React element
    },
    ...
  ]

  // See `ui/core/Paginator`
  @optional
  @prop totalPages defaults to 1
  @prop currentPage
  @prop onChangePage: (newPage) => void
**/
function DataTable(props) {
  return (
    <React.Fragment>
      <Table striped>
        <Table.Header>
          <Table.Row>
            {props.columns.map(column => {
              return (
                <Table.HeaderCell key={column.key}>
                  {column.label}
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.items.map(item => {
            return (
              <Table.Row key={props.getRowKey(item)}>
                {props.columns.map(column => {
                  return (
                    <Table.Cell key={column.key}>
                      {column.render(item)}
                    </Table.Cell>
                   );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Paginator
        totalPages={props.totalPages || 1}
        currentPage={props.currentPage}
        onChange={props.onChangePage}
      />
    </React.Fragment>
  );
}

export default DataTable;
