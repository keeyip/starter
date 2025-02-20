import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {fetchCustomers} from 'lib/queries';
import SiteNav from 'ui/views/Nav/SiteNav';
import Page from 'ui/views/Page';
import DataCard from 'ui/core/DataCard';
import {
  Icon,
  Container,
  Header,
  Divider,
  Tab,
  Grid,
  Accordion,
  Segment
} from 'semantic-ui-react';

/**
  The page starts at STARTUP,
  calls `fetchCustomers()` to get the initial array of customers,
  then moves to READY.

  When changing filters, switching to a different lens, or paginating,
  the page moves to QUERYING, calls `fetchCustomers()` with filters and pagination,
  then moves to READY.
**/
const PAGE_STATUS_STARTUP = 'STARTUP';
const PAGE_STATUS_QUERYING = 'QUERYING';
const PAGE_STATUS_READY = 'READY';

/**
  An explorable customers page, data fetched from `fetchCustomers()`
**/
export default function() {
  const [pageStatus, setPageStatus] = React.useState(PAGE_STATUS_STARTUP);
  const [customers, setCustomers] = React.useState([]);

  const [openCity, setOpenCity] = React.useState(null);

  function handleClickCity(city) {
    if (openCity === city) {
      setOpenCity(null);
    } else {
      setOpenCity(city);
    }
  }

  /**
    Updates element state based on `queryResult`,
    and switches to `nextActiveLensKey` if appropriate.

    @required
    @param queryResult: resolved value of `fetchCustomers()`

    @optional
    @param nextActiveLensKey
  **/
  function update(queryResult, nextActiveLensKey) {
    // NOTE: `unstable_batchedUpdates()` is necessary for now but can be removed
    // in a future version of React.
    ReactDOM.unstable_batchedUpdates(() => {
      setCustomers(queryResult.customers);
      setPageStatus(PAGE_STATUS_READY);
    });
  }

  if (pageStatus === PAGE_STATUS_STARTUP) {
    fetchCustomers({fetchAll: true}).then(update);
  }

  return (
    <Page>
      <SiteNav />

      <Container>
        <Header>Confirmed Appointments</Header>
        <Header>Recent Inspections</Header>
        <Header>Customers List</Header>
        <Header>King County</Header>

        <Accordion styled fluid>
          <Accordion.Title active={openCity === 'kent:king-county'} onClick={() => handleClickCity('kent:king-county')}>
            <Icon name='dropdown' />
            Kent
          </Accordion.Title>

          <Accordion.Content active={openCity === 'kent:king-county'}>
            <Grid stackable columns={2}>
              {_.map(customers, customer => {
                return (
                  <Grid.Column>
                    <DataCard key={customer.uuid}
                      header={customer.name}
                      meta={"10 properties in Kent"}
                    />
                  </Grid.Column>
                );
              })}
            </Grid>
          </Accordion.Content>

          <Accordion.Title active={openCity === 'renton:king-county'} onClick={() => handleClickCity('renton:king-county')}>
            <Icon name='dropdown' />
            Renton
          </Accordion.Title>

          <Accordion.Content active={openCity === 'renton:king-county'}>
          </Accordion.Content>

          <Accordion.Title active={openCity === 'seattle:king-county'} onClick={() => handleClickCity('seattle:king-county')}>
            <Icon name='dropdown' />
            Seattle
          </Accordion.Title>

          <Accordion.Content active={openCity === 'seattle:king-county'}>
          </Accordion.Content>
        </Accordion>

        <Header>Yakima County</Header>
      </Container>
    </Page>
  );
}
