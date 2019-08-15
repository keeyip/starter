import {NameColumn, LocationColumn} from 'ui/core/columns';

export const CONTACT_COLUMNS = [
  NameColumn,
  LocationColumn,
];

export function getRowKey(item) {
  return item.uuid;
}
