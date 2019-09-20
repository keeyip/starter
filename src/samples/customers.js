import _ from 'lodash';
import {getCustomerOrder} from 'lib/models';

/**
  This module contains functions to generate sample customers that
  conform to the data structures expected in `lib/models.js`
**/

/**
  @optional If omitted, returns a small list of hard-coded sample data
  @param count

  Returns an array of customers
**/
export function generateSampleCustomers(count) {
  // NOTE: This initial list is defined here (in this scope) to ensure idempotency of the sample data.
  const list = _.sortBy([
    {
      uuid: 'vader', name: 'Darth Vader',
    },
    {
      uuid: 'armstrong', name: 'Joe Armstrong',
    },
    {
      uuid: 'smith', name: 'Will Smith',
    },
    {
      uuid: 'shelley', name: 'Mary Shelley',
    },
    {
      uuid: 'lee', name: 'Stan Lee',
    },
  ], getCustomerOrder);
  
  if (!count) return list;

  if (count <= list.length) return list.slice(0, count);

  // Count is larger than the initial list so we fill the rest with generic data.
  for (let i = list.length; i < count; i++) {
    list.push({
      uuid: `sample-${i}`, name: `Sample index${i}`,
    });
  }

  return list;
}
