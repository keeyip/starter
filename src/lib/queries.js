// NOTE: Using fake data and fake requests for now.
import {fetchProspects as fetchProspectsMock} from 'lib/__mocks__/queries';
import {fetchCustomers as fetchCustomersMock} from 'lib/__mocks__/queries';
const SIMULATED_NETWORK_LAG = 500;

/**
  This module holds all the various ajax requests
  the application needs to make.

  No other module should be making direct ajax requests,
  all access should be done through the use of this module's functions.

  This ensures that we need to mock only this module for fast automated tests.
**/

/**
  All params are required except `fetchAll` and `filteredStates`.

  `perPage` and `fetchAll` are mutually exclusive.
  `fetchAll` is useful for plotting all data points on a map, for example.

  Returns a promise that resolves with: {
    currentPage,
    totalPages,

    filteredStates,

    prospects
  }
**/
export function fetchProspects({currentPage, perPage, fetchAll, filteredStates}) {
  return new Promise((resolve, reject) => {
    // NOTE: Using fake data and fake requests for now.
    fetchProspectsMock({currentPage, perPage, fetchAll, filteredStates}).then(result => {
      setTimeout(() => resolve(result), SIMULATED_NETWORK_LAG);
    });
  });
}

/**
  All params are required except `fetchAll`.

  `perPage` and `fetchAll` are mutually exclusive.
  `fetchAll` is useful for plotting all data points on a map, for example.

  Returns a promise that resolves with: {
    currentPage,
    totalPages,

    customers
  }
**/
export function fetchCustomers({currentPage, perPage, fetchAll}) {
  return new Promise((resolve, reject) => {
    // NOTE: Using fake data and fake requests for now.
    fetchCustomersMock({currentPage, perPage, fetchAll}).then(result => {
      setTimeout(() => resolve(result), SIMULATED_NETWORK_LAG);
    });
  });
}
