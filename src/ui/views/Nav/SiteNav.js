import React from 'react';
import siteNavMenus from 'staticData/siteNavMenus.json';
import _ from 'lodash';
import {Accordion, Icon, Menu, Header, Divider, Segment, Container} from 'semantic-ui-react';
import {Link, Match} from '@reach/router';

export default function () {
  const [accordionOpen, setAccordionOpen] = React.useState(false);

  function handleClickAccordion() {
    setAccordionOpen(!accordionOpen);
  }

  function closeAccordion() {
    setAccordionOpen(false);
  }

  return (
    <Container>
      <Segment inverted>
        <Accordion inverted fluid>
          <Accordion.Title active={accordionOpen} onClick={handleClickAccordion}>
            <Icon name='dropdown' />
            Main menu
          </Accordion.Title>

          <Accordion.Content active={accordionOpen}>
            <Segment>
              {_.map(siteNavMenus, menu_config => {
                return (
                  <Container key={menu_config.name}>
                    {menu_config.header && (
                      <Header size="medium">
                        {menu_config.header}
                      </Header>
                    )}

                    <Menu vertical fluid>
                      {_.map(menu_config.navItems, item => {
                        return (
                          <Match path={item.path}>
                            {props => props.match ? (
                              <Menu.Item key={item.name}
                                active={true}
                                as={'div'}
                                content={item.label}
                                name={item.name}
                                onClick={closeAccordion}
                              />
                            ) : (
                              <Menu.Item key={item.name}
                                as={Link}
                                to={item.path}
                                link={true}
                                content={item.label}
                                name={item.name}
                              />
                            )}
                          </Match>
                        );
                      })}
                    </Menu>

                    <Divider hidden />
                  </Container>
                );
              })}
            </Segment>
          </Accordion.Content>
        </Accordion>
      </Segment>

      <Divider hidden />
      <Divider hidden />
    </Container>
  );
}
