import React from 'react';
import DataTable from 'ui/core/DataTable';
import {storiesOf} from '@storybook/react';
import {generateSampleProspects} from 'samples/prospects';
import {getRowKey} from 'stories/storyUtil';
import {NameColumn} from 'ui/core/columns';
import {ProspectStatusColumn} from 'ui/views/Prospects/prospectColumns';

storiesOf('ui/views/Prospects/prospectColumns', module)
  .add('ProspectStatusColumn', () => {
    return (
      <DataTable
        getRowKey={getRowKey}

        items={generateSampleProspects()}

        columns={[NameColumn, ProspectStatusColumn]}
      />
    )
  })
