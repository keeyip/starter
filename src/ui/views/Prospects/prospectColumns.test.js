import React from 'react';
import {mount} from 'enzyme';
import {ProspectStatusColumn} from 'ui/views/Prospects/prospectColumns';
import {PROSPECT_STATUSES_ORDERED} from 'lib/model';

it('ProspectStatusColumn.render', () => {
  PROSPECT_STATUSES_ORDERED.forEach(status => {
    const prospect = {status};

    expect(mount(ProspectStatusColumn.render(prospect)).text()).toEqual(status);
  });
});
