import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import ProspectsExplorer from 'ui/views/Prospects/ProspectsExplorer';
import {PROSPECTS_EXPLORER_MAP_LENS_KEY} from 'ui/views/Prospects/ProspectsExplorer';
import {fetchProspects} from 'lib/queries';

/**
  The page starts at STARTUP,
  calls `fetchProspects()` to get the initial array of prospects,
  then moves to READY.

  When changing filters, switching to a different lens, or paginating,
  the page moves to QUERYING, calls `fetchProspects()` with filters and pagination,
  then moves to READY.
**/
const PAGE_STATUS_STARTUP = 'STARTUP';
const PAGE_STATUS_QUERYING = 'QUERYING';
const PAGE_STATUS_READY = 'READY';

/**
  An explorable prospects page, data fetched from `fetchProspects()`
**/
export default function ProspectsPage() {
  const [pageStatus, setPageStatus] = React.useState(PAGE_STATUS_STARTUP);
  const [prospects, setProspects] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [filteredStates, setFilteredStates] = React.useState([]);
  const [activeLensKey, setActiveLensKey] = React.useState(1);

  const perPage = 10;

  /**
    Updates element state based on `queryResult`,
    and switches to `nextActiveLensKey` if appropriate.

    @required
    @param queryResult: resolved value of `fetchProspects()`

    @optional
    @param nextActiveLensKey
  **/
  function update(queryResult, nextActiveLensKey) {
    // NOTE: `unstable_batchedUpdates()` is necessary for now but can be removed
    // in a future version of React.
    ReactDOM.unstable_batchedUpdates(() => {
      setCurrentPage(queryResult.currentPage);
      setTotalPages(queryResult.totalPages);
      setFilteredStates(queryResult.filteredStates);
      setProspects(queryResult.prospects);
      setActiveLensKey(nextActiveLensKey || activeLensKey);
      setPageStatus(PAGE_STATUS_READY);
    });
  }

  if (pageStatus === PAGE_STATUS_STARTUP) {
    fetchProspects({
      currentPage,
      perPage,
      filteredStates
    })
    .then(update);
  }

  return (
    <ProspectsExplorer
      loading={pageStatus !== PAGE_STATUS_READY}
      hideDefaultMessage={pageStatus === PAGE_STATUS_STARTUP}

      prospects={prospects}

      totalPages={totalPages}
      currentPage={currentPage}

      onChangePage={nextPage => {
        setPageStatus(PAGE_STATUS_QUERYING);

        fetchProspects({
          currentPage: nextPage,
          perPage,
          filteredStates
        })
        .then(update);
      }}

      activeLensKey={activeLensKey}

      onSwitchToLens={selectedLens => {
        setPageStatus(PAGE_STATUS_QUERYING);

        fetchProspects({
          currentPage,
          perPage,

          filteredStates,

          // The map needs a non-paginated result set, otherwise
          // we would see markers only for prospects on the current page.
          fetchAll: selectedLens.key === PROSPECTS_EXPLORER_MAP_LENS_KEY
        })
        .then(queryResult => update(queryResult, selectedLens.key));
      }}

      filteredStates={filteredStates}

      onDeleteStateFilter={state => {
        setPageStatus(PAGE_STATUS_QUERYING);

        fetchProspects({
          // Be sure to jump back to page 1, it's a different result set
          currentPage: 1,
          perPage,

          filteredStates: _.without(filteredStates, state)
        })
        .then(update);
      }}

      onAddStateFilter={state => {
        setPageStatus(PAGE_STATUS_QUERYING);

        fetchProspects({
          // Be sure to jump back to page 1, it's a different result set
          currentPage: 1,
          perPage,

          filteredStates: _.uniq(filteredStates.concat(state))
        })
        .then(update);
      }}
    />
  );
}
