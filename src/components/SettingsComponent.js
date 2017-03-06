'use strict';

import React from 'react';
import VizConfigurationComponent from './VizConfigurationComponent.js';
import SettingsBottomBarComponent from './SettingsBottomBarComponent.js';

import { DialogFooter } from 'office-ui-fabric-react/lib-amd/Dialog';

require('styles//Settings.css');

class SettingsComponent extends React.Component {
  render() {
    return (
      <div className="settings-component ms-navigation-dialog">
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-4">
              <VizConfigurationComponent />
            </div>
            <div className="ms-Grid-col ms-u-sm6 ms-u-md8 ms-u-lg8">B</div>
          </div>
          <DialogFooter>
            <SettingsBottomBarComponent />
          </DialogFooter>
          {/*<div className="ms-Grid-row">
            <SettingsBottomBarComponent />
          </div>*/}
        </div>
      </div>
    );
  }
}

SettingsComponent.displayName = 'SettingsComponent';

// Uncomment properties you need
// SettingsComponent.propTypes = {};
// SettingsComponent.defaultProps = {};

export default SettingsComponent;
