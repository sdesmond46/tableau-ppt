'use strict';

import React from 'react';
import { TextField } from 'office-ui-fabric-react/lib-amd/TextField'
import { Checkbox } from 'office-ui-fabric-react/lib-amd/Checkbox'

import * as StateUtils from '../utils/StateUtils';
// import * as TabUtils from 'react-tableau-viz/src/TableauUtils';
import * as TabUtils from '../react-tableau-viz/TableauUtils';

require('styles//VizConfiguration.css');

class VizConfigurationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, {
      initialConfig: Object.assign({}, props.vizConfig)
    }, props.vizConfig);
  }

  _onStateChange() {
    const vizConfig = StateUtils.TakeVizConfigProps(this.state);
    this.props.configChanged(vizConfig);
  }

  _textChanged(propName, value) {
    let newState = {};
    newState[propName] = value;
    this.setState(newState, this._onStateChange.bind(this));
  }

  _makeTextField(label, name) {
    return (<TextField key={name} label={label} value={this.state[name]} onChanged={this._textChanged.bind(this, name)}/>);
  }

  _checkboxChange(propName, box, value) {
    let newState = {};
    newState[propName] = value;
    this.setState(newState, this._onStateChange.bind(this));
  }

  _makeCheckbox(label, name) {
    return (<Checkbox key={name} label={label} checked={!!this.state[name]} onChange={this._checkboxChange.bind(this, name)}/>);
  }

  _urlChanged(value) {
    try {
      let newUrl = TabUtils.ParseTableauUrl(value, window.document);
      this.setState(newUrl, this._onStateChange.bind(this));
    } catch (e) {
      console.log(e);
      this.setState(StateUtils.DefaultVizConfig(), this._onStateChange.bind(this));
    }
    
  }

  render() {
    return (
      <div className="vizconfiguration-component"  key='vizconfiguration'>
        <div key='wrapper'>
          <div className='requiredValues' key='requiredValues'>
            <TextField key='vizUrl' label='Viz Url' required={ true } onChanged={this._urlChanged.bind(this)}/>
            <TextField key='normalizedUrl' label='Normalized Url' disabled={ true } value={this.state.sanitizedUrl} />
          </div>
          <div className='advancedValues' key='advancedValues'>
            {this._makeTextField('Server', 'server')}
            {this._makeTextField('Site', 'site')}
            {this._makeTextField('Workbook', 'workbook')}
            {this._makeTextField('View', 'view')}
            {this._makeTextField('Custom View', 'customView')}
          </div>
          <div className='displayOptions' key='displayOptions'>
            {this._makeCheckbox('Show Tabs', 'showTabs')}
            {this._makeCheckbox('Show Toolbar', 'showToolbar')}
          </div>
        </div>
      </div>
    );
  }
}

VizConfigurationComponent.displayName = 'VizConfigurationComponent';

// Uncomment properties you need
// VizConfigurationComponent.propTypes = {};
VizConfigurationComponent.defaultProps = {
  vizConfig: StateUtils.DefaultVizConfig(),
  configChanged : (newConfig) => {}
};

export default VizConfigurationComponent;
