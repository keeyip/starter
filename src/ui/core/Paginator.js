import React from 'react';
import {Pagination} from 'semantic-ui-react';

/**
  Simple paginator.

  Hidden if there are fewer than 2 pages.

  @required
  @prop totalPages

  @optional If omitted, defaults to page 1
  @prop currentPage

  @optional
  @prop onChange: (newPage) => void
**/
export default function Paginator(props) {
  if (props.totalPages < 2) {
    return null;
  }

  return (
    <Pagination
      activePage={props.currentPage || 1}
      totalPages={props.totalPages}

      onPageChange={(event, data) => props.onChange(data.activePage)}

      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      prevItem={null}
      nextItem={null}
    />
  );
}
