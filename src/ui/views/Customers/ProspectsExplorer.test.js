import React from 'react';
import ProspectsExplorer from 'ui/views/Prospects/ProspectsExplorer';
import {PROSPECTS_EXPLORER_MAP_LENS_KEY} from 'ui/views/Prospects/ProspectsExplorer';
import {mount} from 'enzyme';
import {generateSampleProspects} from 'samples/prospects';

describe('ProspectsExplorer', () => {
  it('renders title', () => {
    const rendered = mount(<ProspectsExplorer />);

    const renderedHeader = rendered.find('.ui.header');
    expect(renderedHeader.length).toEqual(1);
    expect(renderedHeader.text()).toEqual('Prospects');
  });

  it('renders `defaultContent`', () => {
    const rendered = mount(<ProspectsExplorer prospects={[]} />);

    const renderedDefaultContent = rendered.find('.Explorer-defaultContent');

    expect(renderedDefaultContent.text()).toEqual('Sorry, we could not find anything.');
  });

  it('can hide `defaultContent`', () => {
    const rendered = mount(<ProspectsExplorer hideDefaultMessage prospects={[]} />);

    const renderedDefaultContent = rendered.find('.Explorer-defaultContent');

    expect(renderedDefaultContent.text()).toEqual('');
  });

  it('renders data table and map lenses', () => {
    const prospects = generateSampleProspects();

    const rendered = mount(<ProspectsExplorer prospects={prospects} />);

    const renderedTabsMenu = rendered.find('.ui.menu');

    const renderedTabs = renderedTabsMenu.find('a.item');
    expect(renderedTabs.length).toEqual(2);

    ['Data', 'Map'].forEach((lenseLabel, index) => {
      expect(renderedTabs.at(index).text()).toEqual(lenseLabel);
    });

    const activeTab = renderedTabsMenu.find('a.item.active');
    expect(activeTab.length).toEqual(1);
    expect(activeTab.text()).toEqual('Data');
  });

  it('can start with the map lense', () => {
    const prospects = generateSampleProspects();

    const rendered = mount(
      <ProspectsExplorer
        prospects={prospects}
        activeLensKey={PROSPECTS_EXPLORER_MAP_LENS_KEY}
      />
    );

    const renderedTabsMenu = rendered.find('.ui.menu');

    const activeTab = renderedTabsMenu.find('a.item.active');
    expect(activeTab.length).toEqual(1);
    expect(activeTab.text()).toEqual('Map');
  });

  it('renders state filter pills', () => {
    const rendered = mount(<ProspectsExplorer filteredStates={['CA', 'WA']} />);

    const renderedPills = rendered.find('.Explorer-filterPills .ui.label');
    expect(renderedPills.length).toEqual(2);

    ['CA', 'WA'].forEach((pillLabel, index) => {
      expect(renderedPills.at(index).text()).toEqual(pillLabel);
    });
  });

  it('renders filter categories', () => {
    const rendered = mount(<ProspectsExplorer onAddStateFilter={() => true} />);

    const renderedCategories = rendered.find('.Explorer-filterCategories .menu .item');
    expect(renderedCategories.length).toEqual(1);

    ['State'].forEach((catLabel, index) => {
      expect(renderedCategories.at(index).text()).toEqual(catLabel);
    });
  });

  it('does not render filter categories if `onAddStateFilter` omitted', () => {
    const rendered = mount(<ProspectsExplorer />);

    const renderedCategories = rendered.find('.Explorer-filterCategories');
    expect(renderedCategories.exists()).toEqual(false);
  });

  it('can render pagination', () => {
    const prospects = generateSampleProspects();

    const rendered = mount(
      <ProspectsExplorer
        prospects={prospects}

        totalPages={4}
        currentPage={3}
      />
    );

    const activeLink = rendered.find('.ui.pagination a.active[type="pageItem"]');
    expect(activeLink.length).toEqual(1);
    expect(activeLink.at(0).text()).toEqual('3');
  });
});
