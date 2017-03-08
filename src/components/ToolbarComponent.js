'use strict';

import React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib-amd/CommandBar';
import * as OfficeUtils from '../utils/OfficeUtils';

require('styles//Toolbar.css');

class ToolbarComponent extends React.Component {
  constructor(props) {
    super(props);

    this.editItem = {
      name: 'Settings',
      key: 'edit',
      onClick: this._editClicked.bind(this),
      iconProps: {
        iconName: 'Edit'
      }
    };

    const resizeItem = {
      name: 'Resize To Fit',
      key: 'resize',
      onClick: this.props.onResizeToFit
    }

    this.saveChanges = {
      name: 'Save Changes',
      key: 'save',
      onClick: this.props.onSaveChanges,
      iconProps: {
        iconName: 'Save'
      }
    };

    this.infoItem = {
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
        this.editItem,
        this.saveChanges
      ],
      rightItems: [
        this.infoItem
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
      this.props.onSettingsChangedEdited();
    }.bind(this));
  }

  _onInfoClicked() {

  }

  render() {

    this.saveChanges.disabled = !this.props.hasViz || !this.props.isDirty;

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
