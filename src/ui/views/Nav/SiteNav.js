import React, {Component} from 'react';
import {Responsive, Button, Menu} from 'semantic-ui-react';
import _ from 'lodash';

export default function SiteNav({activeNav}) {
  const [pendingNav, setPendingNav] = useState(null);

  function handleClickNavItem(e, {name}) {
    setPendingNav(name);
  }

  const navItems = [
  ];

  const activeItem = _.find(navItems, it => it.name === activeNav);

  return (
    <Menu>
      <Menu.Item
        active={activeNav === 'home'}
        content='Home'
        name='home'
        onClick={this.handleItemClick}
      />
      <Menu.Item
        active={activeNav === 'messages'}
        content='Messages'
        name='messages'
        onClick={this.handleItemClick}
      />

      <Menu.Menu position='right'>
        <Menu.Item>
          <Responsive
            {...Responsive.onlyMobile}
            as={Button}
            content='Switch to desktop version'
            icon='desktop'
            labelPosition='left'
          />
          <Responsive
            as={Button}
            content='Switch to mobile version'
            icon='mobile'
            labelPosition='left'
            minWidth={Responsive.onlyTablet.minWidth}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
