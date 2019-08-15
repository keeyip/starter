import React from 'react';
import _ from 'lodash';
import ProspectsExplorer from 'ui/views/Prospects/ProspectsExplorer';
import {storiesOf} from '@storybook/react';
import {generateSampleProspects} from 'samples/prospects';

storiesOf('ui/views/Prospects/ProspectsExplorer', module)
  .add('Default content (empty)', () => {
    return (
      <ProspectsExplorer prospects={[]} />
    )
  })
  .add('Standard', () => {
    function ThisStory() {
      const [activeLensKey, setActiveLensKey] = React.useState(null);

      return (
        <ProspectsExplorer
          prospects={generateSampleProspects()}

          activeLensKey={activeLensKey}

          onSwitchToLens={selectedLens => {
            setActiveLensKey(selectedLens.key);
          }}
        />
      )
    }

    return <ThisStory />;
  })
  .add('Paginated', () => {
    function ThisStory() {
      const [activeLensKey, setActiveLensKey] = React.useState(null);
      const [currentPage, setCurrentPage] = React.useState(1);

      const perPage = 10;
      const totalPages = 4;
      const allProspects = generateSampleProspects(perPage * totalPages);
      const offset = (currentPage - 1) * perPage;

      return (
        <ProspectsExplorer
          prospects={allProspects.slice(offset, offset + perPage)}

          totalPages={totalPages}
          currentPage={currentPage}

          onChangePage={(newPage) => {
            setCurrentPage(newPage);
          }}

          activeLensKey={activeLensKey}

          onSwitchToLens={selectedLens => {
            setActiveLensKey(selectedLens.key);
          }}
        />
      )
    }

    return <ThisStory />;
  })
  .add('Filtered', () => {
    function ThisStory() {
      const [currentPage, setCurrentPage] = React.useState(1);
      const [filteredStates, setFilteredStates] = React.useState(['CA', 'NY']);
      const [activeLensKey, setActiveLensKey] = React.useState('data');

      const totalProspects = 40;
      const allProspects = generateSampleProspects(totalProspects);

      let filteredProspects = allProspects;
      if (!_.isEmpty(filteredStates)) {
        filteredProspects = allProspects.filter(prospect => {
          return filteredStates.indexOf(prospect.location.state) >= 0;
        });
      }

      let prospects = filteredProspects;
      let totalPages;

      if (activeLensKey === 'data') {
        const perPage = 10;
        totalPages = Math.ceil(filteredProspects.length / perPage);

        const offset = (currentPage - 1) * perPage;
        prospects = filteredProspects.slice(offset, offset + perPage);
      }

      return (
        <ProspectsExplorer
          prospects={prospects}

          totalPages={totalPages}
          currentPage={currentPage}

          onChangePage={(newPage) => {
            setCurrentPage(newPage);
          }}

          activeLensKey={activeLensKey}

          onSwitchToLens={selectedLens => {
            setActiveLensKey(selectedLens.key);
          }}

          filteredStates={filteredStates}

          onDeleteStateFilter={state => {
            setCurrentPage(1);
            setFilteredStates(_.without(filteredStates, state));
          }}

          onAddStateFilter={state => {
            setCurrentPage(1);
            setFilteredStates(_.uniq(filteredStates.concat(state)));
          }}
        />
      )
    }

    return <ThisStory />;
  })
