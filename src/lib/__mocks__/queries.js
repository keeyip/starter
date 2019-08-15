import _ from 'lodash';
import {generateSampleProspects} from 'samples/prospects';

/**
  This is an in-memory mocked version of `lib/queries.js`.
**/

export function fetchProspects({currentPage, perPage, fetchAll, filteredStates}) {
  const TOTAL_PROSPECTS = 40;
  const allProspects = generateSampleProspects(TOTAL_PROSPECTS);

  return new Promise((resolve, reject) => {
    let filteredProspects = allProspects;
    if (!_.isEmpty(filteredStates)) {
      filteredProspects = allProspects.filter(prospect => {
        return filteredStates.indexOf(prospect.location.state) >= 0;
      });
    }

    let prospects = filteredProspects;
    let totalPages;

    if (!fetchAll) {
      totalPages = Math.ceil(filteredProspects.length / perPage);
      const offset = (currentPage - 1) * perPage;
      prospects = filteredProspects.slice(offset, offset + perPage);
    }

    const result = {
      currentPage,
      totalPages,
      filteredStates,
      prospects
    };

    resolve(result);
  });
}
