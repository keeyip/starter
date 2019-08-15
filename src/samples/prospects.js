import _ from 'lodash';

import {
  PROSPECT_STATUS_NEW,
  PROSPECT_STATUS_CONTACTED,
  PROSPECT_STATUS_DECLINED,
  getProspectStatusOrder
} from 'lib/model';

import {
  HollywoodCoordinates,
  RochesterCoordinates,
  SanFranciscoCoordinates,
  JoplinCoordinates,
  SeattleCoordinates
} from 'samples/geo';

/**
  This module contains functions to generate sample prospects that
  conform to the data structures expected in `lib/models.js`
**/

/**
  @optional If omitted, returns a small list of hard-coded sample data
  @param count

  Returns an array of prospects
**/
export function generateSampleProspects(count) {
  // NOTE: This initial list is defined here (in this scope) to ensure idempotency of the sample data.
  const list = _.sortBy([
    {
      uuid: 'vader', name: 'Darth Vader', status: PROSPECT_STATUS_DECLINED,
      location: {city: 'Hollywood', state: 'CA', coordinates: HollywoodCoordinates},
    },
    {
      uuid: 'armstrong', name: 'Joe Armstrong', status: PROSPECT_STATUS_DECLINED,
      location: {city: 'Rochester', state: 'NY', coordinates: RochesterCoordinates}
    },
    {
      uuid: 'smith', name: 'Will Smith', status: PROSPECT_STATUS_NEW,
      location: {city: 'San Francisco', state: 'CA', coordinates: SanFranciscoCoordinates}
    },
    {
      uuid: 'shelley', name: 'Mary Shelley', status: PROSPECT_STATUS_NEW,
      location: {city: 'Joplin', state: 'MO', coordinates: JoplinCoordinates}
    },
    {
      uuid: 'lee', name: 'Stan Lee', status: PROSPECT_STATUS_CONTACTED,
      location: {city: 'Seattle', state: 'WA', coordinates: SeattleCoordinates}
    },
  ], getProspectStatusOrder);
  
  if (!count) return list;

  if (count <= list.length) return list.slice(0, count);

  // Count is larger than the initial list so we fill the rest with generic data.
  for (let i = list.length; i < count; i++) {
    list.push({
      uuid: `sample-${i}`, name: `Sample index${i}`, status: PROSPECT_STATUS_DECLINED,
      location: {city: 'Joplin', state: 'MO', coordinates: JoplinCoordinates}
    });
  }

  return list;
}
