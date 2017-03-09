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
      waitingForOffice: true,
      presenting: false
    }

    window.onhashchange = function() {
      this.setState({
        currentPage : this._getCurrentPage()
      }, this._doneWaitingForOffice.bind(this));
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
    if (Office.context && Office.context.document && Office.context.document.addHandlerAsync) {
      Office.context.document.addHandlerAsync(Office.EventType.ActiveViewChanged, function(eventArgs) {
        const isPresenting = eventArgs.activeView === Office.ActiveView.Read;
        this.setState({ presenting: isPresenting });
      }.bind(this));
    }

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
      return (<button onClick={OfficeUtils.MarkAsMock}>Set up Dev</button>)
    }

    const vizConfig = this.state.vizConfig;
    switch(this.state.currentPage) {
      case 'settings':
        return (<SettingsComponent vizConfig={vizConfig}/>);
      case 'vizContent':
        return (<VizContentComponent vizConfig={vizConfig} onSettingsChangedEdited={this._doneWaitingForOffice.bind(this)} presenting={ this.state.presenting} />);
      default:
        return null;
    }
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
