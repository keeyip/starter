import React from 'react';
import DataTable from 'ui/core/DataTable';
import {NameColumn} from 'ui/core/columns';

export const CUSTOMER_COLUMNS = [
  NameColumn,
];

/**
  A data table that show's the Name for an array of customers.

  @required
  @prop customers

  @optional
  @inheritedFrom `ui/core/DataTable`
  @props {totalPages, currentPage, onChangePage}
**/
export default function(props) {
  return (
    <DataTable
      getRowKey={customer => customer.uuid}
      items={props.customers}
      columns={CUSTOMER_COLUMNS}
      totalPages={props.totalPages}
      currentPage={props.currentPage}
      onChangePage={props.onChangePage}
    />
  );
}
