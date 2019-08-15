import React from 'react';
import DataTable from 'ui/core/DataTable';
import {NameColumn, LocationColumn} from 'ui/core/columns';
import {ProspectStatusColumn} from 'ui/views/Prospects/prospectColumns';

export const PROSPECT_COLUMNS = [
  NameColumn,
  LocationColumn,
  ProspectStatusColumn,
];

/**
  A data table that show's the Name, Location, and Status for
  an array of prospects.

  @required
  @prop prospects

  @optional
  @inheritedFrom `ui/core/DataTable`
  @props {totalPages, currentPage, onChangePage}
**/
export default function ProspectsTable(props) {
  return (
    <DataTable
      getRowKey={prospect => prospect.uuid}
      items={props.prospects}
      columns={PROSPECT_COLUMNS}
      totalPages={props.totalPages}
      currentPage={props.currentPage}
      onChangePage={props.onChangePage}
    />
  );
}
