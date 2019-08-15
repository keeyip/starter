import React from 'react';
import _ from 'lodash';
import Explorer from 'ui/core/Explorer';
import ProspectsTable from 'ui/views/Prospects/ProspectsTable';
import ProspectsMap from 'ui/views/Prospects/ProspectsMap';
import {StateFilter} from 'ui/core/filters';

export const PROSPECTS_EXPLORER_DATA_LENS_KEY = 'data';
export const PROSPECTS_EXPLORER_MAP_LENS_KEY = 'map';

/**
  A simple explorer for prospects; consists of two lenses:

  1) A data table of prospects, paginated.

  2) A US map with circular markers indicating the location of prospects.
  Prospects in the same city are not differentiated.

  There is also a StateFilter to filter for prospects in specific states. The filter
  applies to both the data table and the map.

  Filtering and paginating is delegated to higher-level components
  via `onAddStateFilter`, `onDeleteStateFilter`, and `onChangePage`.

  @optional If omitted or empty, hides lenses.
  @prop prospects

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

  // Callback for applying a filter
  @optional If omitted, the "Filter by" dropdown is hidden
  @props onAddStateFilter: (selectedState) => void

  // Callback for deleting a filter
  @props onDeleteStateFilter: (selectedState) => void
**/
export default function ProspectsExplorer(props) {
  let lenses;

  if (!_.isEmpty(props.prospects)) {
    lenses = [
      {
        key: PROSPECTS_EXPLORER_DATA_LENS_KEY,
        active: props.activeLensKey === PROSPECTS_EXPLORER_DATA_LENS_KEY,

        label: 'Data',
        render: () => {
          return (
            <ProspectsTable
              prospects={props.prospects}
              totalPages={props.totalPages}
              currentPage={props.currentPage}
              onChangePage={props.onChangePage}
            />
          );
        }
      },
      {
        key: PROSPECTS_EXPLORER_MAP_LENS_KEY,
        active: props.activeLensKey === PROSPECTS_EXPLORER_MAP_LENS_KEY,

        label: 'Map',
        render: () => {
          return (
            <ProspectsMap prospects={props.prospects} />
          )
        }
      }
    ]
  }

  let filterCategories;
  
  if (props.onAddStateFilter) {
    filterCategories = [
      {
        key: 'state',
        label: 'State',

        renderDialogContent: ({closeDialog}) => {
          return (
            <StateFilter
              onChange={state => {
                _.invoke(props, 'onAddStateFilter', state);
                closeDialog();
              }}
            />
          );
        }
      }
    ]
  }

  let filterPills;

  if (props.filteredStates) {
    filterPills = props.filteredStates.map(state => {
      return {
        key: state,
        label: state,

        onDelete: () => {
          _.invoke(props, 'onDeleteStateFilter', state);
        }
      };
    });
  }

  let defaultContent;

  if (!props.hideDefaultMessage) {
    defaultContent = (
      <div>Sorry, we could not find anything.</div>
    );
  }

  return (
    <Explorer
      title="Prospects"

      loading={props.loading}

      defaultContent={defaultContent}

      lenses={lenses}
      onSwitchToLens={props.onSwitchToLens}

      filterCategories={filterCategories}
      filterPills={filterPills}
    />
  );
}
