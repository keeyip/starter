import React from 'react';
import {NameColumn, LocationColumn} from 'ui/core/columns';

it('NameColumn.render', () => {
  const item = {
    name: 'Mario Bros.'
  };

  expect(NameColumn.render(item)).toEqual('Mario Bros.');
});

it('LocationColumn.render', () => {
  const item = {
    location: {
      city: 'Random City',
      state: 'TX'
    }
  };

  expect(LocationColumn.render(item)).toEqual('Random City, TX');
});
