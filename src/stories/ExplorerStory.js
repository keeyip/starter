import React from 'react';
import _ from 'lodash';
import Explorer from 'ui/core/Explorer';
import DataTable from 'ui/core/DataTable';
import {storiesOf} from '@storybook/react';
import {Card} from 'semantic-ui-react';
import {StateFilter} from 'ui/core/filters';
import {generateSampleProspects} from 'samples/prospects';
import {CONTACT_COLUMNS, getRowKey} from 'stories/storyUtil';

storiesOf('ui/core/Explorer', module)
  .add('Default content (empty)', () => {
    return (
      <Explorer
        title="Contacts"
        defaultContent="No contacts found."
      />
    )
  })
  .add('Single lense', () => {
    const contacts = generateSampleProspects();

    return (
      <Explorer
        title="Contacts"

        lenses={[
          {
            key: 'table',
            label: 'Table',

            render: () => {
              return (
                <DataTable getRowKey={getRowKey} items={contacts} columns={CONTACT_COLUMNS} />
              )
            }
          },
        ]}
      />
    )
  })
  .add('Multiple lenses', () => {
    function ThisStory() {
      const [activeLensKey, setActiveLensKey] = React.useState('cards');

      const contacts = generateSampleProspects();

      return (
        <Explorer
          title="Contacts"

          onSwitchToLens={selectedLens => {
            console.info('selectedLens', selectedLens);
            setActiveLensKey(selectedLens.key);
          }}

          lenses={[
            {
              key: 'table',
              label: 'Table',

              active: activeLensKey === 'table',

              render: () => {
                return (
                  <DataTable getRowKey={getRowKey} items={contacts} columns={CONTACT_COLUMNS} />
                )
              }
            },
            {
              key: 'cards',
              label: 'Cards',

              active: activeLensKey === 'cards',

              render: () => {
                return (
                  <Card.Group doubling itemsPerRow={3} stackable>
                    {contacts.map(contact => {
                      return (
                        <Card key={getRowKey(contact)}>
                          <Card.Content>
                            <Card.Header>{contact.name}</Card.Header>

                            <Card.Meta>{contact.location.state}</Card.Meta>
                          </Card.Content>
                        </Card>
                      )
                    })}
                  </Card.Group>
                )
              }
            }
          ]}
        />
      );
    }

    return <ThisStory />;
  })
  .add('Filters', () => {
    function ThisStory() {
      const [filters, setFilters] = React.useState(['CA', 'NY']);

      const filterPills = filters.map(filter => {
        return {
          label: filter,
          key: filter,
          onDelete: () => {
            setFilters(_.without(filters, filter));
          }
        };
      });

      return (
        <Explorer
          title="Contacts"

          lenses={[
            {
              key: 'table',
              label: 'Table',

              render: () => {
                return null;
              }
            },
          ]}

          filterCategories={[
            {
              key: 'state',
              label: 'State',

              renderDialogContent: ({closeDialog}) => {
                return (
                  <StateFilter
                    onChange={stateAbbrev => {
                      setFilters(_.uniq(filters.concat(stateAbbrev)));
                      closeDialog();
                    }}
                  />
                )
              }
            }
          ]}

          filterPills={filterPills}
        />
      );
    };

    return <ThisStory />;
  })
  .add('Loading', () => {
    return (
      <Explorer loading
        title="Contacts"

        columns={CONTACT_COLUMNS}
      />
    )
  })
  .add('Loading over default content (empty)', () => {
    return (
      <Explorer loading
        title="Contacts"

        defaultContent="No contacts found."
      />
    )
  })
  .add('Loading over existing content', () => {
    const contacts = generateSampleProspects();

    return (
      <Explorer loading
        title="Contacts"

        lenses={[
          {
            key: 'table',
            label: 'Table',

            render: () => {
              return (
                <DataTable getRowKey={getRowKey} items={contacts} columns={CONTACT_COLUMNS} />
              )
            }
          },
        ]}
      />
    );
  })
