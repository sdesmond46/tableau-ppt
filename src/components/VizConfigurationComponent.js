'use strict';

import React from 'react';
import { TextField } from 'office-ui-fabric-react/lib-amd/TextField'
import { Checkbox } from 'office-ui-fabric-react/lib-amd/Checkbox'

require('styles//VizConfiguration.css');

class VizConfigurationComponent extends React.Component {
  render() {
    return (
      <div className="vizconfiguration-component">
        <div>
          <div className='requiredValues'>
            <TextField label='Viz Url' required={ true } placeholder='' />
            <TextField label='Normalized Url' disabled={ true } />
          </div>
          <div className='advancedValues'>
            <TextField label='Server' />
            <TextField label='Site' />
            <TextField label='Workbook' />
            <TextField label='View' />
            <TextField label='Custom View' />
          </div>
          <div className='displayOptions'>
            <Checkbox label='Show Tabs' />
            <Checkbox label='Show Toolbar' />
          </div>
        </div>
      </div>
    );
  }
}

VizConfigurationComponent.displayName = 'VizConfigurationComponent';

// Uncomment properties you need
// VizConfigurationComponent.propTypes = {};
// VizConfigurationComponent.defaultProps = {};

export default VizConfigurationComponent;
