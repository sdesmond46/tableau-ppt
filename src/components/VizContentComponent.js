'use strict';

import React from 'react';
import FullSizeVizComponent from './FullSizeVizComponent';

require('styles//VizContent.css');

class VizContentComponent extends React.Component {
  render() {
    return (
      <div className="vizcontent-component">
        <FullSizeVizComponent vizConfig={this.props.vizConfig} isEnabled={true} />
      </div>
    );
  }
}

VizContentComponent.displayName = 'VizContentComponent';

// Uncomment properties you need
VizContentComponent.propTypes = {
  vizConfig: React.PropTypes.object.isRequired
};
// VizContentComponent.defaultProps = {};

export default VizContentComponent;
