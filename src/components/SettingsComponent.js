'use strict';

import React from 'react';
import VizConfigurationComponent from './VizConfigurationComponent.js';
import SettingsBottomBarComponent from './SettingsBottomBarComponent.js';
import VizPreviewComponent from './VizPreviewComponent.js';
import * as StateUtils from '../utils/StateUtils';

require('styles//Settings.css');

class SettingsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validConfig: StateUtils.ValidateVizConfig(props.vizConfig),
      currentConfig: props.vizConfig
    };
  }

  _onVizConfigurationChanged(vizConfig) {
    const validConfig = StateUtils.ValidateVizConfig(vizConfig);
    this.setState({validConfig: validConfig, currentConfig: vizConfig});
  }

  render() {
    return (
      <div className="settings-component">
        <div className="">
          <div className="">
            <div className="configuration mainPanel">
              <VizConfigurationComponent vizConfig={this.state.currentConfig} configChanged={this._onVizConfigurationChanged.bind(this)} />
            </div>
            <div className="divider mainPanel"></div>
            <div className="preview mainPanel">
              <VizPreviewComponent vizConfig={this.state.currentConfig} isEnabled={this.state.validConfig} />
            </div>
          </div>
        </div>
        <div className="footer-wrapper">
          <SettingsBottomBarComponent isEnabled={this.state.validConfig}/>
        </div>
      </div>
    );
  }
}

SettingsComponent.displayName = 'SettingsComponent';

// Uncomment properties you need
// SettingsComponent.propTypes = {};
SettingsComponent.defaultProps = {
  vizConfig: StateUtils.DefaultVizConfig()
};

export default SettingsComponent;
