import React from 'react';
import ProspectsMap from 'ui/views/Prospects/ProspectsMap';
import {storiesOf} from '@storybook/react';
import {generateSampleProspects} from 'samples/prospects';

storiesOf('ui/views/Prospects/ProspectsMap', module)
  .add('Standard', () => {
    return (
      <ProspectsMap prospects={generateSampleProspects()} />
    );
  })
