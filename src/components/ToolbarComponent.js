'use strict';

import React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib-amd/CommandBar';
import * as OfficeUtils from '../utils/OfficeUtils';

require('styles//Toolbar.css');

class ToolbarComponent extends React.Component {
  constructor(props) {
    super(props);

    const editItem = {
      name: 'Edit',
      key: 'edit',
      onClick: this._editClicked.bind(this),
      iconProps: {
        iconName: 'Edit'
      }
    };

    const infoItem = {
      name: 'About',
      key: 'about',
      onClick: this._onInfoClicked.bind(this),
      iconProps: {
        iconName: 'Info'
      }
    };

    this.state = {
      showing: false,
      items: [
        editItem
      ],
      rightItems: [
        infoItem
      ]
    };

    document.addEventListener('mouseenter', this._mouseEvent.bind(this, true));
    document.addEventListener('mouseleave', this._mouseEvent.bind(this, false));
  }

  _mouseEvent(isOver) {
    this.setState({
      showing: isOver
    });
  }

  _editClicked() {
    OfficeUtils.ShowSettings(function() {
      debugger;
      this.props.onSettingsChangedEdited();
    }.bind(this));
  }

  _onInfoClicked() {

  }

  render() {
    let classNames = 'toolbar-component ';
    classNames += this.state.showing ? 'ms-u-slideUpIn20 show' : 'ms-u-slideDownOut20 hide';
    return (
      <div className={classNames}>
        <CommandBar isSearchBoxVisible={false} items={this.state.items} farItems={this.state.rightItems}/>
      </div>
    );
  }
}

ToolbarComponent.displayName = 'ToolbarComponent';

// Uncomment properties you need
// ToolbarComponent.propTypes = {};
// ToolbarComponent.defaultProps = {};

export default ToolbarComponent;
