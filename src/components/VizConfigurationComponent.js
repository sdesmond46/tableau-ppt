'use strict';

import React from 'react';
import { TextField } from 'office-ui-fabric-react/lib-amd/TextField'
import { Checkbox } from 'office-ui-fabric-react/lib-amd/Checkbox'

require('styles//VizConfiguration.css');

class VizConfigurationComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, {
      initialConfig: Object.assign({}, props.vizConfig)
    }, props.vizConfig);
  }

  _textChanged(propName, value) {
    let newState = {};
    newState[propName] = value;
    this.setState(newState);
  }

  _makeTextField(label, name) {
    return (<TextField label={label} value={this.state[name]} onChanged={this._textChanged.bind(this, name)}/>);
  }

  _checkboxChange(propName, box, value) {
    let newState = {};
    newState[propName] = value;
    this.setState(newState);
  }

  _makeCheckbox(label, name) {
    return (<Checkbox label={label} checked={!!this.state[name]} onChange={this._checkboxChange.bind(this, name)}/>);
  }

  render() {
    return (
      <div className="vizconfiguration-component">
        <div>
          <div className='requiredValues'>
            <TextField label='Viz Url' required={ true } />
            <TextField label='Normalized Url' disabled={ true } />
          </div>
          <div className='advancedValues'>
            {this._makeTextField('Server', 'server')}
            {this._makeTextField('Site', 'site')}
            {this._makeTextField('Workbook', 'workbook')}
            {this._makeTextField('View', 'view')}
            {this._makeTextField('Custom View', 'customView')}
          </div>
          <div className='displayOptions'>
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
  vizConfig: {
    'server': '',
    'site': '',
    'workbook': '',
    'view': '',
    'customView': '',
    'showTabs': false,
    'showToolbar': false
  }
};

export default VizConfigurationComponent;
