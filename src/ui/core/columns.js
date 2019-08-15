/**
  This module holds all generic table columns.

  NOTE: `NameColumn` and `LocationColumn` are considered generic
  because every business object has a generic notion of `name` or `location`,
  the semantics and data structures of these attributes are common among all business objects.

  Each column has: {
    @required
    @member key: React key for this column

    @required
    @member label: string or React element

    @required
    @member render: (item) => string or React element
  }
**/

export const NameColumn = {
  key: 'name',
  label: 'Name',
  render: item => item.name
};

export const LocationColumn = {
  key: 'location',
  label: 'Location',
  render: item => `${item.location.city}, ${item.location.state}`
};
