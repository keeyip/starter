import React from 'react';
import siteNavMenus from 'staticData/siteNavMenus.json';
import _ from 'lodash';
import {Accordion, Menu, Divider, Segment, Container} from 'semantic-ui-react';

export default function ({activeNav, onClickNav}) {
  const [navOpen, setNavOpen] = React.useState(false);

  if (!activeNav) {
    activeNav = siteNavMenus[0].navItems[0].name;
  }

  let currentNavItem;
  _.find(siteNavMenus, menu_config => {
    const result = _.find(menu_config.navItems, it => it.name === activeNav);
    if (result) {
      currentNavItem = result;
      return true;
    }
  });

  function handleClickNavItem(e, {name}) {
    // TODO:
  }

  const panels = [
    {
      key: 'nav',
      title: `Main menu`,
      content: {
        content: (
          <Segment>
            {_.map(siteNavMenus, menu_config => {
              return (
                <Container key={menu_config.name}>
                  <Menu text vertical>
                    {menu_config.header && (
                      <Menu.Item header key="__menu_header__">
                        {menu_config.header}
                      </Menu.Item>
                    )}

                    {_.map(menu_config.navItems, item => {
                      return (
                        <Menu.Item key={item.name}
                          active={activeNav === item.name}
                          content={item.label}
                          name={item.name}
                          onClick={handleClickNavItem}
                        />
                      );
                    })}
                  </Menu>

                  <Divider hidden />
                </Container>
              );
            })}
          </Segment>
        )
      }
    }
  ];

  return (
    <Container>
      <Segment inverted>
        <Accordion
          inverted
          fluid
          defaultIndex={-1}
          panels={panels}
        />
      </Segment>

      <Divider hidden />
      <Divider hidden />
    </Container>
  );
}
