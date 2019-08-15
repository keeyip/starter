import React from 'react';
import DataTable from 'ui/core/DataTable';
import {storiesOf} from '@storybook/react';
import {generateSampleProspects} from 'samples/prospects';
import {CONTACT_COLUMNS, getRowKey} from 'stories/storyUtil';

storiesOf('ui/core/DataTable', module)
  .add('Single row', () => {
    return (
      <DataTable
        getRowKey={getRowKey}

        items={generateSampleProspects(1)}

        columns={CONTACT_COLUMNS}
      />
    )
  })
  .add('Single page', () => {
    return (
      <DataTable
        getRowKey={getRowKey}

        items={generateSampleProspects()}

        columns={CONTACT_COLUMNS}
      />
    )
  })
  .add('Paginated', () => {
    function ThisStory() {
      const [currentPage, setCurrentPage] = React.useState(1);

      const perPage = 10;
      const totalPages = 4;
      const allProspects = generateSampleProspects(perPage * totalPages);
      const offset = (currentPage - 1) * perPage;

      return (
        <DataTable
          getRowKey={getRowKey}

          items={allProspects.slice(offset, offset + perPage)}

          columns={CONTACT_COLUMNS}

          totalPages={totalPages}
          currentPage={currentPage}

          onChangePage={(newPage) => {
            setCurrentPage(newPage);
          }}
        />
      );
    }

    return <ThisStory />;
  })
