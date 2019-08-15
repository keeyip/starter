import React from 'react';
import ProspectsPage from 'ui/views/Prospects/ProspectsPage';
import {storiesOf} from '@storybook/react';

storiesOf('ui/views/Prospects/ProspectsPage', module)
  .add('Standard', () => {
    return <ProspectsPage />;
  })
