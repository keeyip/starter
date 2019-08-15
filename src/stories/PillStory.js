import React from 'react';
import Pill from 'ui/core/Pill';
import {storiesOf} from '@storybook/react';

storiesOf('ui/core/Pill', module)
  .add('One', () => {
    return (
      <Pill label="Washington" />
    )
  })
  .add('Many', () => {
    return (
      <div>
        <Pill key="1" label="Washington" />
        <Pill key="2" label="California" />
        <Pill key="3" label="New York" />
      </div>
    )
  })
  .add('Delete button', () => {
    return (
      <Pill
        label="Washington"
        
        onDelete={() => {
          // pass
        }}
      />
    )
  })

