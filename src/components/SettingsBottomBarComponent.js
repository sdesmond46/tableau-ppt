'use strict';

import React from 'react';
import { PrimaryButton, DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib-amd/Button';

require('styles//SettingsBottomBar.css');

class SettingsBottomBarComponent extends React.Component {
  render() {
    return (
      <div className='settingsbottombar-component'>
        <PrimaryButton className='ms-Dialog-action'>OK</PrimaryButton>
        <DefaultButton className='ms-Dialog-action'>Cancel</DefaultButton>
      </div>
    );
  }
}

SettingsBottomBarComponent.displayName = 'SettingsBottomBarComponent';

// Uncomment properties you need
// SettingsBottomBarComponent.propTypes = {};
// SettingsBottomBarComponent.defaultProps = {};

export default SettingsBottomBarComponent;
