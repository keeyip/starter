import React from 'react';
import Explorer from 'ui/core/Explorer';
import {mount} from 'enzyme';

describe('Explorer', () => {
  it('renders title', () => {
    const rendered = mount(
      <Explorer
        title="My Contacts"
      />
    );

    const renderedHeader = rendered.find('.ui.header');
    expect(renderedHeader.length).toEqual(1);
    expect(renderedHeader.text()).toEqual('My Contacts');
  });

  it('renders `defaultContent`', () => {
    const rendered = mount(
      <Explorer
        title="My Contacts"
        defaultContent="No contacts found."
        lenses={[]}
      />
    );

    const renderedDefaultContent = rendered.find('.Explorer-defaultContent');

    expect(renderedDefaultContent.text()).toEqual('No contacts found.');
  });

  it('renders a single lense without tabs', () => {
    const rendered = mount(
      <Explorer
        title="My Contacts"
        defaultContent="No contacts found."
        lenses={[
          {
            key: 'lenseExample',
            label: 'Lense Example',

            render: () => {
              return (
                <div className="lenseExample">This is an example lense</div>
              );
            }
          }
        ]}
      />
    );

    const renderedTabsMenu = rendered.find('.ui.menu');
    expect(renderedTabsMenu.exists()).toEqual(false);

    const renderedLense = rendered.find('.lenseExample');
    expect(renderedLense.text()).toEqual('This is an example lense');
  });

  it('renders multiple lenses with tabs, default to first lense', () => {
    const rendered = mount(
      <Explorer
        title="My Contacts"
        defaultContent="No contacts found."
        lenses={[
          {
            key: 'lense1',
            label: 'Lense One',

            render: () => {
              return (
                <div className="lense1">This is Lense One</div>
              );
            }
          },

          {
            key: 'lense2',
            label: 'Lense Two',

            render: () => {
              return (
                <div className="lense2">This is Lense Two</div>
              );
            }
          },
        ]}
      />
    );

    const renderedTabsMenu = rendered.find('.ui.menu');

    const renderedTabs = renderedTabsMenu.find('a.item');
    expect(renderedTabs.length).toEqual(2);

    ['Lense One', 'Lense Two'].forEach((lenseLabel, index) => {
      expect(renderedTabs.at(index).text()).toEqual(lenseLabel);
    });

    const activeTab = renderedTabsMenu.find('a.item.active');
    expect(activeTab.length).toEqual(1);
    expect(activeTab.text()).toEqual('Lense One');

    const renderedLense1 = rendered.find('.lense1');
    expect(renderedLense1.text()).toEqual('This is Lense One');

    const renderedLense2 = rendered.find('.lense2');
    expect(renderedLense2.exists()).toEqual(false);
  });

  it('can render a specific lense', () => {
    const rendered = mount(
      <Explorer
        title="My Contacts"
        defaultContent="No contacts found."
        lenses={[
          {
            key: 'lense1',
            label: 'Lense One',

            render: () => {
              return (
                <div className="lense1">This is Lense One</div>
              );
            }
          },

          {
            key: 'lense2',
            label: 'Lense Two',
            active: true,

            render: () => {
              return (
                <div className="lense2">This is Lense Two</div>
              );
            }
          },
        ]}
      />
    );

    const renderedTabsMenu = rendered.find('.ui.menu');

    const activeTab = renderedTabsMenu.find('a.item.active');
    expect(activeTab.length).toEqual(1);
    expect(activeTab.text()).toEqual('Lense Two');

    const renderedLense1 = rendered.find('.lense1');
    expect(renderedLense1.exists()).toEqual(false);

    const renderedLense2 = rendered.find('.lense2');
    expect(renderedLense2.text()).toEqual('This is Lense Two');
  });

  it('renders filter pills', () => {
    const rendered = mount(
      <Explorer
        title="My Contacts"

        filterPills={[
          {key: 'pill1', label: 'Pill One'},
          {key: 'pill2', label: 'Pill Two'},
        ]}
      />
    );

    const renderedPills = rendered.find('.Explorer-filterPills .ui.label');
    expect(renderedPills.length).toEqual(2);

    ['Pill One', 'Pill Two'].forEach((pillLabel, index) => {
      expect(renderedPills.at(index).text()).toEqual(pillLabel);
    });
  });

  it('renders filter categories', () => {
    const rendered = mount(
      <Explorer
        title="My Contacts"

        filterCategories={[
          {key: 'cat1', label: 'Cat One', renderDialogContent: () => true},
          {key: 'cat2', label: 'Cat Two', renderDialogContent: () => true},
        ]}
      />
    );

    const renderedCategories = rendered.find('.Explorer-filterCategories .menu .item');
    expect(renderedCategories.length).toEqual(2);

    ['Cat One', 'Cat Two'].forEach((catLabel, index) => {
      expect(renderedCategories.at(index).text()).toEqual(catLabel);
    });
  });
});
