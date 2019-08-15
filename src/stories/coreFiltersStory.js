import React from 'react';
import {storiesOf} from '@storybook/react';
import {StateFilter} from 'ui/core/filters';

storiesOf('ui/core/filters', module)
  .add('StateFilter', () => {
    return (
      <StateFilter />
    );
  })
