'use strict';

import React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib-amd/CommandBar';
// import { Button } from 'office-ui-fabric-react/lib-amd/Button';
import { Callout, DirectionalHint  } from 'office-ui-fabric-react/lib-amd/Callout';
import { Link } from 'office-ui-fabric-react/lib-amd/Link';
import * as OfficeUtils from '../utils/OfficeUtils';
import * as StateUtils from '../utils/StateUtils';


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
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

  _onCalloutDismissed() {
    this.setState({
      isCalloutVisible: false
    });
  }

  _getVizInfo() {
    if (!this.props.vizConfig) {
      return null;
    }

    let results = [];
    for (let i = 0; i < StateUtils.advancedProps.length; i++) {
      const line = (
        <div key={StateUtils.advancedProps[i]}>
          <span className='ms-fontWeight-semibold'>{StateUtils.advancedPropNames[i] + ': '}</span>{this.props.vizConfig[StateUtils.advancedProps[i]]}
        </div>);
      
      results.push(line);
    }

    return results;
  }

  render() {
    this.saveChanges.disabled = !this.props.hasViz || !this.props.isDirty;

    const calloutTarget = document.querySelector('[aria-label="About"]');
    const callout = this.state.showing && this.state.isCalloutVisible ? (
      <Callout
        directionalHint={DirectionalHint.topRightEdge}
        className='callout-wrapper'
        gapSpace={ 0 }
        targetElement={calloutTarget}
        onDismiss={ this._onCalloutDismissed.bind(this) }
        setInitialFocus={ true }
      >
        <div>
          <p className='ms-font-m-plus'>
            Viz Info
          </p>
        </div>
        <div>
          <div className='ms-font-s'>
            {this._getVizInfo()}
          </div>
          <br />
          <div>
            <Link target='_blank' href='http://tableau.com'>Documentation</Link>
          </div>
        </div>
      </Callout>) : null;

    let classNames = 'toolbar-component ';
    classNames += this.state.showing ? 'ms-u-slideUpIn20 show' : 'ms-u-slideDownOut20 hide';
    return (
      <div className={classNames}>
        <CommandBar id='commandBar' isSearchBoxVisible={false} items={this.state.items} farItems={this.state.rightItems}/>
        {callout}
      </div>
    );
  }
}

ToolbarComponent.displayName = 'ToolbarComponent';

// Uncomment properties you need
// ToolbarComponent.propTypes = {};
// ToolbarComponent.defaultProps = {};

export default ToolbarComponent;
