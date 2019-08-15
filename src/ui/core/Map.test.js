import React from 'react';
import Map from 'ui/core/Map';
import {mount} from 'enzyme';
import {
  SeattleCoordinates,
  SanFranciscoCoordinates,
  HoustonCoordinates
} from 'samples/geo';

describe('Map', () => {
  it('renders markers', () => {
    const markers = [
      {key: 'seattle', coordinates: SeattleCoordinates},
      {key: 'san francisco', coordinates: SanFranciscoCoordinates},
      {key: 'houston', coordinates: HoustonCoordinates},
    ];

    const rendered = mount(<Map markers={markers} center={HoustonCoordinates} />);

    const renderedMarkers = rendered.find('.rsm-marker');
    expect(renderedMarkers.length).toEqual(3);
  });
});
