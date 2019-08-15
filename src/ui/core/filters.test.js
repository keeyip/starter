import React from 'react';
import {mount} from 'enzyme';
import {StateFilter} from 'ui/core/filters';

describe('StateFilter', () => {
  it('renders states alphabetically', () => {
    const orderedStateLabels = [
      'CA (California)',
      'MO (Missouri)',
      'NY (New York)',
      'WA (Washington)',
    ];

    const rendered = mount(<StateFilter />);
    const renderedOptions = rendered.find('[role="option"]');

    expect(renderedOptions.length).toEqual(orderedStateLabels.length);

    orderedStateLabels.forEach((label, index) => {
      expect(renderedOptions.at(index).text()).toEqual(label);
    });
  });
});
