import {
  PROSPECT_STATUS_NEW,
  PROSPECT_STATUS_CONTACTED,
  PROSPECT_STATUS_DECLINED,

  PROSPECT_STATUSES_ORDERED,

  PROSPECT_STATUS_COLOR_NEW,
  PROSPECT_STATUS_COLOR_CONTACTED,
  PROSPECT_STATUS_COLOR_DECLINED,

  isProspectNew,
  isProspectContacted,
  isProspectDeclined,

  getProspectStatusColor,
  getProspectStatusOrder,
} from 'lib/model';

it('isProspectNew', () => {
  expect(isProspectNew({status: PROSPECT_STATUS_NEW})).toEqual(true);

  expect(isProspectNew({status: PROSPECT_STATUS_CONTACTED})).toEqual(false);

  expect(isProspectNew({status: PROSPECT_STATUS_DECLINED})).toEqual(false);
});

it('isProspectContacted', () => {
  expect(isProspectContacted({status: PROSPECT_STATUS_NEW})).toEqual(false);

  expect(isProspectContacted({status: PROSPECT_STATUS_CONTACTED})).toEqual(true);

  expect(isProspectContacted({status: PROSPECT_STATUS_DECLINED})).toEqual(false);
});

it('isProspectDeclined', () => {
  expect(isProspectDeclined({status: PROSPECT_STATUS_NEW})).toEqual(false);

  expect(isProspectDeclined({status: PROSPECT_STATUS_CONTACTED})).toEqual(false);

  expect(isProspectDeclined({status: PROSPECT_STATUS_DECLINED})).toEqual(true);
});

it('getProspectStatusOrder', () => {
  const ordering = PROSPECT_STATUSES_ORDERED.map(status => getProspectStatusOrder({status}));

  // Assert that we get a strictly ascending ordering.
  let prevOrder = -1;
  for (let order in ordering) {
    expect(prevOrder < order).toEqual(true);
    prevOrder = order;
  }
});

it('getProspectStatusColor', () => {
  expect(getProspectStatusColor({status: PROSPECT_STATUS_NEW})).toEqual(PROSPECT_STATUS_COLOR_NEW);
  expect(getProspectStatusColor({status: PROSPECT_STATUS_CONTACTED})).toEqual(PROSPECT_STATUS_COLOR_CONTACTED);
  expect(getProspectStatusColor({status: PROSPECT_STATUS_DECLINED})).toEqual(PROSPECT_STATUS_COLOR_DECLINED);
});
