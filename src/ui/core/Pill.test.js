import React from 'react';
import Pill from 'ui/core/Pill';
import {mount} from 'enzyme';

describe('Pill', () => {
  it('renders label', () => {
    expect(mount(<Pill label="Random text" />).text()).toEqual('Random text');
  });

  it('renders color className', () => {
    const rendered = mount(<Pill label="Test" color="orange" />);
    expect(rendered.find('.ui.label').hasClass('orange')).toEqual(true);
  });

  it('renders delete button if `onDelete` is provided', () => {
    const rendered = mount(<Pill label="x > 10" onDelete={() => true} />);
    expect(rendered.find('.delete').exists()).toEqual(true);
  });

  it('does not render delete button if `onDelete` is omitted', () => {
    const rendered = mount(<Pill label="Test" color="orange" />);
    expect(rendered.find('.delete').exists()).toEqual(false);
  });
});
