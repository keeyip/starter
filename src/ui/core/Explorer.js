import React from 'react';
import _ from 'lodash';
import Pill from 'ui/core/Pill';
import {
  Container,
  Header,
  Divider,
  Modal,
  Dropdown,
  Tab,
  Dimmer,
  Transition,
  Loader,
} from 'semantic-ui-react';

/**
  Customizable data-centric explorer with unified filters applied across multiple lenses.

  Lenses are just tabs that each provide a different way of inspecting or visualizing the data.

  A lense has a `render` function that is called as the user switches into the lense.

  NOTE: `Explorer` does not need to receive the actual data in `props`,
  the data should be directly accessible to each `lense.render`
  through closure in a higher-level UI component.

  @required
  @prop title: string or React element

  @optional
  @prop loading: bool

  // Default content when there are no lenses
  @optional
  @prop defaultContent: string or React element

  // Can be omitted if you just want to show `defaultContent`
  @optional
  @prop lenses: [
    {
      @required
      @member key: React key for this lense

      @required
      @member label: string,

      @optional First lense is chosen if no other lense is active.
      @mutuallyExclusive
      @member active: bool

      // Only called for the active lense.
      @required
      @member render: () => React element
    },
    ...
  ]

  @optional
  @prop onSwitchToLens: (selectedLens) => void

  // Shows a dropdown of filter categories.
  @optional
  @prop filterCategories: [
    {
      @required
      @member key: React key for this menu item

      @required
      @member label: string,

      // Called when a user clicks on this category, renders into a popup dialog.
      // Receives a `closeDialog` function to be called by `renderDialogContent`
      // when the modal should be closed.
      @required
      @member renderDialogContent: ({closeDialog}) => void
    },
    ...
  ]

  // A list of free-text pills that are used to convey to the user
  // that various filters are active. Each pill would typically correspond to a
  // single filter. The pill's delete button will call `filterPill.onDelete()`
  // to allow for a higher-level UI component to remove the filter.
  //
  // NOTE: `filterPill.onDelete` should already have contextual information via closure.
  @optional
  @prop filterPills: [
    {
      @required
      @member key: React key for this pill,

      @required
      @member label: string or React element,

      // Called when the delete button is clicked
      @optional If omitted, delete button is hidden
      @member onDelete: () => void
    },
    ...
  ]
**/
export default function Explorer(props) {
  const [selectedFilterCategory, setSelectedFilterCategory] = React.useState(false);

  // We want to show the modal as long as we've selected a filter category.
  const shouldShowDialog = selectedFilterCategory;

  // Closing the modal is a matter of nulling out `selectedFilterCategory`.
  function closeDialog() {
    setSelectedFilterCategory(null);
  }

  const titleHeader = (
    <Header>{props.title}</Header>
  );

  let headContent;

  if (_.isEmpty(props.filterCategories)) {
    headContent = titleHeader;

  } else {
    headContent = (
      <React.Fragment>
        {titleHeader}

        <Dropdown text="Filter by" icon="filter" labeled button className="icon Explorer-filterCategories">
          <Dropdown.Menu>
            {props.filterCategories.map(filterCategory => {
              return (
                <Dropdown.Item key={filterCategory.key}
                  onClick={() => setSelectedFilterCategory(filterCategory)}
                >
                  {filterCategory.label}
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Divider />

        {shouldShowDialog && (
          <Modal open closeIcon centered={false} onClose={closeDialog} >
            <Header icon='filter' content={selectedFilterCategory.label} />

            <Modal.Content>
              {selectedFilterCategory.renderDialogContent({closeDialog})}
            </Modal.Content>
          </Modal>
        )}
      </React.Fragment>
    );
  }

  let filterPillsArea;

  if (!_.isEmpty(props.filterPills)) {
    filterPillsArea = (
      <div className="Explorer-filterPills">
        {props.filterPills.map(filter => {
          return (
            <Pill key={filter.key} label={filter.label} onDelete={filter.onDelete} />
          );
        })}

        <Divider />
      </div>
    );
  }

  let bodyContent;

  if (_.isEmpty(props.lenses)) {
    bodyContent = (
      <div className="Explorer-defaultContent">{props.defaultContent}</div>
    );

  } else if (props.lenses.length === 1) {
    bodyContent = (
      <div>{_.first(props.lenses).render()}</div>
    );

  } else {
    let activeIndex = 0;

    const tabPanes = props.lenses.map((lense, index) => {
      if (lense.active) {
        activeIndex = index;
      }

      return {
        menuItem: lense.label,

        render: () => {
          return (
            <Tab.Pane key={lense.key} as="div"
              content={lense.render()}
            />
          );
        }
      };
    });

    const tabSettings = {pointing: true, secondary: true};

    bodyContent = (
      <div className="Explorer-lenses">
        <Tab activeIndex={activeIndex} panes={tabPanes} menu={tabSettings}
          onTabChange={(event, data) => {
            const selectedLens = props.lenses[data.activeIndex];
            _.invoke(props, 'onSwitchToLens', selectedLens);
          }}
        />
      </div>
    );
  }
  
  const showDimmer = !!props.loading;

  const transitionSettings = {hide: 300, show: 300};

  return (
    <Container>
      {headContent}

      {filterPillsArea}

      {bodyContent}

      <Transition duration={transitionSettings} visible={showDimmer}>
        <Dimmer active={showDimmer} page>
          <Loader />
        </Dimmer>
      </Transition>
    </Container>
  );
}
