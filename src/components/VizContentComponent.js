'use strict';

import React from 'react';
import FullSizeVizComponent from './FullSizeVizComponent';
import ToolbarComponent from './ToolbarComponent';

import * as OfficeUtils from '../utils/OfficeUtils';
import * as TabUtils from '../react-tableau-viz/TableauUtils';

require('styles//VizContent.css');

const eventNames = [ 'filterchange',
  'marksselection',
  'parametervaluechange',
  'storypointswitch',
  'tabswitch' ];

class VizContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isDirty: false};

    this.dirtyEvt = this._vizEdited.bind(this);
    
  }

  render() {
    // Only show the toolbar if we're not presenting
    const toolbar = !this.props.presenting ?
      <ToolbarComponent vizConfig={this.props.vizConfig} hasViz={!!this.viz} isDirty={this.state.isDirty} onSettingsChangedEdited={this.props.onSettingsChangedEdited} onResizeToFit={this._onResizeToFit.bind(this)} onSaveChanges={this._onRememberChanges.bind(this)}/> :
      null;

    return (
      <div className="vizcontent-component">
        <FullSizeVizComponent vizConfig={this.props.vizConfig} isEnabled={true} onFirstInteractive={this._onFirstInteractive.bind(this)} />
        {toolbar}
      </div>
    );
  }


  _onResizeToFit() {
    if (this.viz) {
      const options = {
        behavior: 'AUTOMATIC'
      };

      this.viz.getWorkbook().getActiveSheet().changeSizeAsync(options);
    }
  }

  _onFirstInteractive(vizEvent) {
    this.viz = vizEvent.getViz();
    this.setState(
      { isDirty: false },
      this._configureEventListeners.bind(this, true)
    );
  }

  _configureEventListeners(register) {
    if (this.registeredEventListeners === register) {
      // We've already done this
      return;
    }

    if (!this.viz) {
      // No viz yet
      return;
    }

    for (let i = 0; i < eventNames.length; i++) {
      register ? this.viz.addEventListener(eventNames[i], this.dirtyEvt) : this.viz.removeEventListener(eventNames[i], this.dirtyEvt);
    }

    this.registeredEventListeners = register;
  }

 componentDidMount() {
     this._configureEventListeners(true);
  }

  componentWillUnmount() {
    this._configureEventListeners(false);
  }

  _vizEdited() {
    this.setState(
      { isDirty: true }
    )
  }

  _onRememberChanges() {
    if (this.viz) {
      const viewName = 'tableau-ppt_' + new Date().getTime();
      this.viz.getWorkbook().rememberCustomViewAsync(viewName).then((customView) => {
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
