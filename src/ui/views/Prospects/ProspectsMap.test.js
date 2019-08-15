import React from 'react';
import ProspectsMap from 'ui/views/Prospects/ProspectsMap';
import {mount} from 'enzyme';
import {generateSampleProspects} from 'samples/prospects';
import {
  PROSPECT_STATUS_NEW,
  PROSPECT_STATUS_CONTACTED,
  PROSPECT_STATUS_DECLINED,
  getProspectStatusColor
} from 'lib/model';
import {
  SeattleCoordinates,
  SanFranciscoCoordinates,
  HoustonCoordinates
} from 'samples/geo';

describe('ProspectsMap', () => {
  it('renders colored markers', () => {
    const prospects = generateSampleProspects();

    const rendered = mount(<ProspectsMap prospects={prospects} />);

    const renderedMarkers = rendered.find('.rsm-marker');
    expect(renderedMarkers.length).toEqual(prospects.length);

    prospects.forEach((prospect, index) => {
      const circleFill = renderedMarkers.at(index).getDOMNode().style.getPropertyValue('fill');
      const expectedColor = getProspectStatusColor(prospect);
      expect(circleFill).toEqual(expectedColor);
    });
  });
});
