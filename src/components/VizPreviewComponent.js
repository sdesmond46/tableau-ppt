'use strict';

import React from 'react';
import TableauVizReact from 'react-tableau-viz/src/TableauVizReact';
import { CommandButton } from 'office-ui-fabric-react/lib-amd/Button';

require('styles//VizPreview.css');

class VizPreviewComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let viz = null;
    const { showViz, vizConfig } = this.props;
    if (showViz && vizConfig.sanitizedUrl) {
      viz = <TableauVizReact url={vizConfig.sanitizedUrl} width='100%' height='100%'/>
    }

    return (
      <div className="vizpreview-component">
        <div className='preview-container'>
          <CommandButton icon='Sync' disabled={ !this.props.isEnabled }>
            Preview
          </CommandButton>
        </div>
        <div className='vizPreviewContainer'>
          {viz}
        </div>
      </div>
    );
  }
}

VizPreviewComponent.displayName = 'VizPreviewComponent';

// Uncomment properties you need
// VizPreviewComponent.propTypes = {};
VizPreviewComponent.defaultProps = {
  isEnabled: true,
  showViz: true,
  vizConfig: {
    'sanitizedUrl' : 'https://public.tableau.com/views/FourDecadesofPrevalenceinAdultBMI/TrendsinFourDecadesofBMIcategories'
  }
};

export default VizPreviewComponent;
