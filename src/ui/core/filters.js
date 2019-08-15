import React from 'react';
import {Select} from 'semantic-ui-react';

/**
  This module holds all generic filter controls.

  NOTE: `StateFilter` is considered generic because selecting a US State
  is a fairly context-agnostic task, the result of which can be utilized by
  a higher-level context-specific UI component.

  Each filter is a React component, see the specific filter for usage details.
**/

/**
  A basic US State selector, limited to just a few states for now.

  @prop onChange: stateAbbrev => void
**/
export function StateFilter(props) {
  const selectOptions = [
    {key: 'CA', value: 'CA', text: 'CA (California)'},
    {key: 'MO', value: 'MO', text: 'MO (Missouri)'},
    {key: 'NY', value: 'NY', text: 'NY (New York)'},
    {key: 'WA', value: 'WA', text: 'WA (Washington)'},
  ];

  return (
    <Select
      placeholder="Filter by state"
      options={selectOptions}
      onChange={(event, data) => props.onChange(data.value)}
    />
  );
}
