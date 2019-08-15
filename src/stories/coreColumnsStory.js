import React from 'react';
import DataTable from 'ui/core/DataTable';
import {storiesOf} from '@storybook/react';
import {getRowKey} from 'stories/storyUtil';
import {NameColumn, LocationColumn} from 'ui/core/columns';

storiesOf('ui/core/columns', module)
  .add('NameColumn', () => {
    const item = {
      name: 'Lionel Ritchie'
    };

    return (
      <DataTable
        getRowKey={getRowKey}
        items={[item]}
        columns={[NameColumn]}
      />
    )
  })
  .add('LocationColumn', () => {
    const item = {
      name: 'Lionel Ritchie',
      location: {
        city: 'Seattle',
        state: 'WA'
      }
    };

    return (
      <DataTable
        getRowKey={getRowKey}
        items={[item]}
        columns={[NameColumn, LocationColumn]}
      />
    )
  })
