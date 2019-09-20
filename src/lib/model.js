/**

Holds all business (domain-specific) constants and logic.

NOTE: Ajax requests do not belong here, put them in `lib/queries.js` instead.

A prospect looks like: {
  uuid, name, status,

  location: {
    city,

    // State Abbreviation
    state,

    // NOTE: The coordinates are defined as `[longitude, latitude]` (flipped)
    // as a matter of convenience when working with `react-simple-maps`.
    coordinates: [longitude, latitude],
  }
}

A customer looks like: {
  uuid, name,

  properties: []
}

A property looks like this: {
  uuid, name?,

  address,
  inspections: []
}

An address looks like this: {
  address_lines,

  city,

  // State Abbreviation
  state,

  zip_code,

  // NOTE: The coordinates are defined as `[longitude, latitude]` (flipped)
  // as a matter of convenience when working with `react-simple-maps`.
  coordinates: [longitude, latitude]
}

An inspection looks like this: {
  scheduled_start,
  scheduled_end,

  inspected_start,
  inspected_end,

  inspection_report
}

An inspection report looks like this: {
  storage_url
}

**/

export const PROSPECT_STATUS_NEW = 'New';
export const PROSPECT_STATUS_CONTACTED = 'Contacted';
export const PROSPECT_STATUS_DECLINED = 'Declined';

export const PROSPECT_STATUSES_ORDERED = [
  PROSPECT_STATUS_NEW,
  PROSPECT_STATUS_CONTACTED,
  PROSPECT_STATUS_DECLINED,
];

export const PROSPECT_STATUS_COLOR_NEW = 'hsl(200, 100%, 50%)';
export const PROSPECT_STATUS_COLOR_CONTACTED = 'hsl(150, 80%, 45%)';
export const PROSPECT_STATUS_COLOR_DECLINED = 'gray';

export function isProspectNew(prospect) {
  return prospect.status === PROSPECT_STATUS_NEW;
}

export function isProspectContacted(prospect) {
  return prospect.status === PROSPECT_STATUS_CONTACTED;
}

export function isProspectDeclined(prospect) {
  return prospect.status === PROSPECT_STATUS_DECLINED;
}

/**
  Status colors have domain-specific semantic meaning.
  They are defined here as a function to enable
  re-use in various pieces of UI such as table cells,
  markers on a map, etc...
**/
export function getProspectStatusColor(prospect) {
  if (isProspectNew(prospect)) {
    return PROSPECT_STATUS_COLOR_NEW;

  } else if (isProspectContacted(prospect)) {
    return PROSPECT_STATUS_COLOR_CONTACTED;

  } else if (isProspectDeclined(prospect)) {
    return PROSPECT_STATUS_COLOR_DECLINED;
  }
}

export function getProspectStatusOrder(prospect) {
  return PROSPECT_STATUSES_ORDERED.indexOf(prospect.status);
}

export function getCustomerOrder(customer) {
  return customer.name;
}
