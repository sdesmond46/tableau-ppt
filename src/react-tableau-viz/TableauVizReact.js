import React from 'react';
import * as TabUtils from './TableauUtils.js';
import postscribe from 'postscribe';

class TableauVizReact extends React.Component {
constructor(props) {
		super(props);
		this.state = {
			loadingProgress: 'unloaded'
		};
	}

	componentWillMount() {
	}

	componentDidMount() {
		const parsedUrl = TabUtils.ParseTableauUrl(this.props.url, document);
		const baseJsApiUrl = parsedUrl.server + '/javascripts/api/tableau-2.js';

		// Use postscribe to write in the tableau js library. It is MAGIC
		postscribe('#vizContainer', '<script src="' + baseJsApiUrl + '"><\/script>', {
			done: function() {
				this._tryInitViz(this.props.url); 
			}.bind(this), error: function() {
				// TODO
			}.bind(this)
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.url != this.props.url ||
		nextProps.hideTabs != this.props.hideTabs ||
		nextProps.hideToolbar != this.props.hideToolbar) {
			this._tryInitViz(nextProps.url);
		}


	}

	render () {
		return (
				<div id='vizContainer'>
				</div>
		);
	}

	_buildVizCreateOptions() {
		let result = {};
		const passThroughProps = ['hideTabs', 'hideToolbar', 'height', 'width', 'device', 'onFirstVizSizeKnown'];
		for (const i in passThroughProps) {
			const propName = passThroughProps[i];
			if (this.props.hasOwnProperty(propName)) {
				result[propName] = this.props[propName];
			}
		}

		Object.assign(result, this.props.filters);
		result.onFirstInteractive = function(e) {
			this.setState({loadingProgress: 'vizInteractive'});
			if (this.props.onFirstInteractive) {
				this.props.onFirstInteractive(e);
			}
		}.bind(this);

		if (!result.hideToolbar) {
			result.toolbarPosition = 'top';
		}

		return result;
	}

	_tryInitViz(urlString) {
		if (this.state.viz) {
			this.state.viz.dispose();
		}

		var containerDiv = document.getElementById('vizContainer');
    const url = TabUtils.ParseTableauUrl(urlString, document).sanitizedUrl;
    const options = this._buildVizCreateOptions();
 
    const viz = new tableau.Viz(containerDiv, url, options);
		this.setState({'viz' : viz});
	}
}

TableauVizReact.prototypes = {
	url: React.PropTypes.string.isRequired,

	// These are mostly the vizCreateOptions list. See https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#ref_head_9
	hideTabs: React.PropTypes.bool,
	hideToolbar: React.PropTypes.bool,
	height: React.PropTypes.string,
	width: React.PropTypes.string,
	device: React.PropTypes.string,
	filters: React.PropTypes.object,
	onFirstInteractive: React.PropTypes.func,
	onFirstVizSizeKnown: React.PropTypes.func
};

export default TableauVizReact;
