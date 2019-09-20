import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import CustomersExplorer from 'ui/views/Customers/CustomersExplorer';
import {fetchCustomers} from 'lib/queries';
import SiteNav from 'ui/views/Nav/SiteNav';
import Page from 'ui/views/Page';

/**
  The page starts at STARTUP,
  calls `fetchCustomers()` to get the initial array of customers,
  then moves to READY.

  When changing filters, switching to a different lens, or paginating,
  the page moves to QUERYING, calls `fetchCustomers()` with filters and pagination,
  then moves to READY.
**/
const PAGE_STATUS_STARTUP = 'STARTUP';
const PAGE_STATUS_QUERYING = 'QUERYING';
const PAGE_STATUS_READY = 'READY';

/**
  An explorable customers page, data fetched from `fetchCustomers()`
**/
export default function() {
  const [pageStatus, setPageStatus] = React.useState(PAGE_STATUS_STARTUP);
  const [customers, setCustomers] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [activeLensKey, setActiveLensKey] = React.useState(1);

  const perPage = 10;

  /**
    Updates element state based on `queryResult`,
    and switches to `nextActiveLensKey` if appropriate.

    @required
    @param queryResult: resolved value of `fetchCustomers()`

    @optional
    @param nextActiveLensKey
  **/
  function update(queryResult, nextActiveLensKey) {
    // NOTE: `unstable_batchedUpdates()` is necessary for now but can be removed
    // in a future version of React.
    ReactDOM.unstable_batchedUpdates(() => {
      setCurrentPage(queryResult.currentPage);
      setTotalPages(queryResult.totalPages);
      setCustomers(queryResult.customers);
      setActiveLensKey(nextActiveLensKey || activeLensKey);
      setPageStatus(PAGE_STATUS_READY);
    });
  }

  if (pageStatus === PAGE_STATUS_STARTUP) {
    fetchCustomers({
      currentPage,
      perPage,
    })
    .then(update);
  }

  return (
    <Page>
      <SiteNav />
      <CustomersExplorer
        loading={pageStatus !== PAGE_STATUS_READY}
        hideDefaultMessage={pageStatus === PAGE_STATUS_STARTUP}

        customers={customers}

        totalPages={totalPages}
        currentPage={currentPage}

        onChangePage={nextPage => {
          setPageStatus(PAGE_STATUS_QUERYING);

          fetchCustomers({
            currentPage: nextPage,
            perPage,
          })
          .then(update);
        }}

        activeLensKey={activeLensKey}

        onSwitchToLens={selectedLens => {
          setPageStatus(PAGE_STATUS_QUERYING);

          fetchCustomers({
            currentPage,
            perPage,
          })
          .then(queryResult => update(queryResult, selectedLens.key));
        }}
      />
    </Page>
  );
}
