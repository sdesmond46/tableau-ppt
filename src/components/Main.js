require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import SettingsComponent from './SettingsComponent.js';

class AppComponent extends React.Component {
  render() {
    return (
      <SettingsComponent>
      </SettingsComponent>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
