import React from 'react';
import Map from 'ui/core/Map';
import {storiesOf} from '@storybook/react';
import {
  SeattleCoordinates,
  SanFranciscoCoordinates,
  RochesterCoordinates,
  HollywoodCoordinates,
  JoplinCoordinates,
  HoustonCoordinates
} from 'samples/geo';

storiesOf('ui/core/Map', module)
  .add('USA', () => {
    return (
      <Map center={HoustonCoordinates} />
    )
  })
  .add('Markers', () => {
    const markers = [
      {key: 'seattle', coordinates: SeattleCoordinates},

      {key: 'san francisco', coordinates: SanFranciscoCoordinates},

      {key: 'rochester', coordinates: RochesterCoordinates, color: 'red', radius: 12},

      {key: 'hollywood', coordinates: HollywoodCoordinates},

      {key: 'Joplin', coordinates: JoplinCoordinates}
    ];

    return (
      <Map markers={markers} center={HoustonCoordinates} />
    )
  })

