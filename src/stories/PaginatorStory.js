import React from 'react';
import Paginator from 'ui/core/Paginator';
import {storiesOf} from '@storybook/react';

storiesOf('ui/core/Paginator', module)
  .add('Only one page', () => {
    return (
      <div>
        <p>You should see nothing:</p>

        <Paginator totalPages={1} />
      </div>
    )
  })
  .add('Multiple pages', () => {
    function ThisStory() {
      const [currentPage, setCurrentPage] = React.useState(1);

      return (
        <Paginator
          totalPages={4}
          currentPage={currentPage}

          onChange={page => {
            setCurrentPage(page);
          }}
        />
      )
    }

    return <ThisStory />;
  })
