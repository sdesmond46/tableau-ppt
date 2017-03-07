'use strict';

import React from 'react';
import VizConfigurationComponent from './VizConfigurationComponent.js';
import SettingsBottomBarComponent from './SettingsBottomBarComponent.js';
import VizPreviewComponent from './VizPreviewComponent.js';

require('styles//Settings.css');

class SettingsComponent extends React.Component {
  render() {
    return (
      <div className="settings-component">
        <div className="">
          <div className="">
            <div className="configuration mainPanel">
              <VizConfigurationComponent />
            </div>
            <div className="divider mainPanel"></div>
            <div className="preview mainPanel">
              <VizPreviewComponent />
            </div>
          </div>
        </div>
        <div className="footer-wrapper">
          <SettingsBottomBarComponent />
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
