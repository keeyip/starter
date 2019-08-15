import React from 'react';
import Paginator from 'ui/core/Paginator';
import {mount} from 'enzyme';

describe('Paginator', () => {
  it('renders nothing if only 1 page', () => {
    const rendered = mount(<Paginator totalPages={1} />);
    expect(rendered.html()).toEqual(null);
  });

  it('can render a 2-page paginator', () => {
    const rendered = mount(<Paginator totalPages={2} />);
    const renderedLinks = rendered.find('.ui.pagination a[type="pageItem"]');

    expect(renderedLinks.length).toEqual(2);

    ['1', '2'].forEach((pageItemText, index) => {
      expect(renderedLinks.at(index).text()).toEqual(pageItemText);
    });
  });

  it('picks page 1 by default', () => {
    const rendered = mount(<Paginator totalPages={3} />);
    const activeLink = rendered.find('.ui.pagination a.active[type="pageItem"]');

    expect(activeLink.length).toEqual(1);
    expect(activeLink.at(0).text()).toEqual('1');
  });

  it('accepts currentPage', () => {
    const rendered = mount(<Paginator totalPages={4} currentPage={3} />);
    const activeLink = rendered.find('.ui.pagination a.active[type="pageItem"]');

    expect(activeLink.length).toEqual(1);
    expect(activeLink.at(0).text()).toEqual('3');
  });
});
