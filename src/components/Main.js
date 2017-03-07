require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import SettingsComponent from './SettingsComponent.js';
import VizContentComponent from './VizContentComponent';
import * as StateUtils from '../utils/StateUtils';
import * as OfficeUtils from '../utils/OfficeUtils';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage : this._getCurrentPage(),
      vizConfig: StateUtils.DefaultVizConfig(),
      waitingForOffice: true
    }

    window.onhashchange = function() {
      this.setState({
        currentPage : this._getCurrentPage()
      });
    }.bind(this);

    // We need to initialize office and let it know we are an add-in
    Office.initialize = this._doneWaitingForOffice.bind(this);
  }

  componentDidMount() {
    const runningInOffice = OfficeUtils.RunningInOffice();
    if (!runningInOffice) {
      this._doneWaitingForOffice();
    }
  }

  _getCurrentPage() {
    if (window.location.hash.indexOf('settings') >= 0) {
      return 'settings';
    } else {
      return 'vizContent';
    }
  }

  _doneWaitingForOffice() {
    const vizConfig = OfficeUtils.LoadSetting('vizConfig') || StateUtils.DefaultVizConfig();
    this.setState({
      waitingForOffice: false,
      vizConfig: vizConfig
    });

    if (this.state.currentPage == 'vizContent' && !StateUtils.ValidateVizConfig(vizConfig)) {
      OfficeUtils.ShowSettings(this._doneWaitingForOffice.bind(this));
    }
  }

  render() {
    if (this.state.waitingForOffice) {
      return (<h1>Waiting for Office to Initialize</h1>)
    }

    const vizConfig = this.state.vizConfig;
    switch(this.state.currentPage) {
      case 'settings':
        return (<SettingsComponent vizConfig={vizConfig}/>);
      case 'vizContent':
        return (<VizContentComponent vizConfig={vizConfig}/>);
      default:
        return null;
    }
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
