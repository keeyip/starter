import React from 'react';
import ProspectsTable from 'ui/views/Prospects/ProspectsTable';
import {storiesOf} from '@storybook/react';
import {generateSampleProspects} from 'samples/prospects';

storiesOf('ui/views/Prospects/ProspectsTable', module)
  .add('Standard', () => {
    return <ProspectsTable prospects={generateSampleProspects()} />
  })
  .add('Paginated', () => {
    function ThisStory() {
      const [currentPage, setCurrentPage] = React.useState(1);

      const perPage = 10;
      const totalPages = 4;
      const allProspects = generateSampleProspects(perPage * totalPages);
      const offset = (currentPage - 1) * perPage;

      return (
        <ProspectsTable
          prospects={allProspects.slice(offset, offset + perPage)}

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
