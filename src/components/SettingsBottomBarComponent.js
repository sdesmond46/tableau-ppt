'use strict';

import React from 'react';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib-amd/Button';

require('styles//SettingsBottomBar.css');

class SettingsBottomBarComponent extends React.Component {
  render() {
        return (
      <div className='settingsbottombar-component'>
          <span className=''>
              <PrimaryButton onClick={this.props.okClicked} disabled={!this.props.isEnabled}>{'OK'}</PrimaryButton>
              <DefaultButton onClick={this.props.cancelClicked} >{'Cancel'}</DefaultButton>
          </span>
      </div>
    );
  }
}

SettingsBottomBarComponent.displayName = 'SettingsBottomBarComponent';

// Uncomment properties you need
// SettingsBottomBarComponent.propTypes = {};
SettingsBottomBarComponent.defaultProps = {
  isEnabled: false
};

export default SettingsBottomBarComponent;
