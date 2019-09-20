import React from 'react';
import _ from 'lodash';
import Explorer from 'ui/core/Explorer';
import CustomersTable from 'ui/views/Customers/CustomersTable';

export const CUSTOMERS_EXPLORER_DATA_LENS_KEY = 'data';

/**
  A simple explorer for customers; consists of just one lens.

  Paginating is delegated to higher-level components via `onChangePage`.

  @optional If omitted or empty, hides lenses.
  @prop customers

  @optional
  @prop loading: bool

  // Indicates that the explorer should not show a default message when there is no data.
  // Useful when showing just a loader for the first data fetch.
  @optional
  @prop hideDefaultMessage: bool

  @optional
  @prop activeLensKey

  // See `ui/core/Explorer`
  @optional
  @prop onSwitchToLens

  // Pagination props
  @prop totalPages
  @prop currentPage
  @prop onChangePage: (newPage) => void
**/
export default function(props) {
  let lenses;

  if (!_.isEmpty(props.customers)) {
    lenses = [
      {
        key: CUSTOMERS_EXPLORER_DATA_LENS_KEY,
        active: props.activeLensKey === CUSTOMERS_EXPLORER_DATA_LENS_KEY,

        label: 'Data',
        render: () => {
          return (
            <CustomersTable
              customers={props.customers}
              totalPages={props.totalPages}
              currentPage={props.currentPage}
              onChangePage={props.onChangePage}
            />
          );
        }
      },
    ]
  }

  let defaultContent;

  if (!props.hideDefaultMessage) {
    defaultContent = (
      <div>Sorry, we could not find anything.</div>
    );
  }

  return (
    <Explorer
      title="Customers"

      loading={props.loading}

      defaultContent={defaultContent}

      lenses={lenses}
      onSwitchToLens={props.onSwitchToLens}
    />
  );
}
