'use strict';

import React from 'react';
import TableauVizReact from '../react-tableau-viz/TableauVizReact';

require('styles//FullSizeViz.css');

class FullSizeVizComponent extends React.Component {
  render() {
    let viz = null;
    const { vizConfig, isEnabled } = this.props;
    if (isEnabled && vizConfig.sanitizedUrl) {
      viz = <TableauVizReact url={vizConfig.sanitizedUrl} width='100%' height='100%' hideTabs={!vizConfig.showTabs} hideToolbar={!vizConfig.showToolbar} onFirstInteractive={this.props.onFirstInteractive}/>
    }

    return viz;
  }
}

FullSizeVizComponent.displayName = 'FullSizeVizComponent';

// Uncomment properties you need
// FullSizeVizComponent.propTypes = {};
FullSizeVizComponent.defaultProps = {
  onFirstInteractive: () => {}
};

export default FullSizeVizComponent;
