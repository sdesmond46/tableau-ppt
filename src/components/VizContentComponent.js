'use strict';

import React from 'react';
import FullSizeVizComponent from './FullSizeVizComponent';
import ToolbarComponent from './ToolbarComponent';

import * as OfficeUtils from '../utils/OfficeUtils';
import * as TabUtils from '../react-tableau-viz/TableauUtils';

require('styles//VizContent.css');

class VizContentComponent extends React.Component {
  render() {
    return (
      <div className="vizcontent-component">
        <FullSizeVizComponent vizConfig={this.props.vizConfig} isEnabled={true} onFirstInteractive={this._onFirstInteractive.bind(this)} />
        <ToolbarComponent onSettingsChangedEdited={this.props.onSettingsChangedEdited} onResizeToFit={this._onResizeToFit.bind(this)} onSaveChanges={this._onRememberChanges.bind(this)}/>
      </div>
    );
  }


  _onResizeToFit() {
    if (this.state.viz) {
      const options = {
        behavior: 'AUTOMATIC'
      };

      this.state.viz.getWorkbook().getActiveSheet().changeSizeAsync(options);
    }
  }

  _onFirstInteractive(vizEvent) {
    const viz = vizEvent.getViz();
    this.setState(
      { viz: viz }
    );
  }

  _onRememberChanges() {
    if (this.state.viz) {
      const viewName = 'tableau-ppt_' + new Date().getTime();
      this.state.viz.getWorkbook().rememberCustomViewAsync(viewName).then((customView) => {
        const viewUrl = customView.getUrl();
        const parsedUrl = TabUtils.ParseTableauUrl(viewUrl, window.document);
        const newVizConfig = Object.assign({}, this.props.vizConfig, { 
          customView: parsedUrl.customView,
          sanitizedUrl: parsedUrl.sanitizedUrl
        });
        OfficeUtils.SaveSetting('vizConfig', newVizConfig, this.props.onSettingsChangedEdited);
      });
    }
  }
}

VizContentComponent.displayName = 'VizContentComponent';

// Uncomment properties you need
VizContentComponent.propTypes = {
  vizConfig: React.PropTypes.object.isRequired,
  onSettingsChangedEdited: React.PropTypes.func.isRequired
};
// VizContentComponent.defaultProps = {};

export default VizContentComponent;
