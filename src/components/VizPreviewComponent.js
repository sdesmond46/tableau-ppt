'use strict';

import React from 'react';
import TableauVizReact from 'react-tableau-viz/src/TableauVizReact';
import { CommandButton } from 'office-ui-fabric-react/lib-amd/Button';

require('styles//VizPreview.css');

class VizPreviewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showViz: false
    };
  }

  _previewClicked() {
    this.setState({showViz: true});
    this.forceUpdate();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.showViz && nextProps.vizConfig.sanitizedUrl != this.props.vizConfig.sanitizedUrl) {
      // The url has changed, so we shouldn't auto reload the new viz
      this.setState({showViz: false});
    }
  }

  render() {
    let viz = null;
    const { vizConfig, isEnabled } = this.props;
    if (this.state.showViz && isEnabled && vizConfig.sanitizedUrl) {
      viz = <TableauVizReact url={vizConfig.sanitizedUrl} width='100%' height='100%'/>
    }

    return (
      <div className="vizpreview-component">
        <div className='preview-container'>
          <CommandButton icon='Sync' disabled={ !this.props.isEnabled } onClick={this._previewClicked.bind(this)}>
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
  isEnabled: false,
  vizConfig: {
  }
};

export default VizPreviewComponent;
