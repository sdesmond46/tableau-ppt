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

    this.enterEvent = this._mouseEvent.bind(this, true);
    this.leaveEvent = this._mouseEvent.bind(this, false);
  }

  componentDidMount() {
    document.addEventListener('mouseover', this.enterEvent);
    document.addEventListener('mouseout', this.leaveEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseover', this.enterEvent);
    document.removeEventListener('mouseout', this.leaveEvent);
  }

  _mouseEvent(isOver, mouseEvent) {
    console.log('mouseEvent.clientY = ' + mouseEvent.clientY + ' window.innerHeight = ' + window.innerHeight);

    if (!isOver) {
      if (!(mouseEvent.clientY >= window.innerHeight || mouseEvent.clientY <= 0 || mouseEvent.clientX >= window.innerWidth || mouseEvent.clientX <= 0)) {
        return;
      }
    }

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
