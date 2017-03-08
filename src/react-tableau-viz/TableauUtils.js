const ParseTableauUrl = function(vizUrl, doc) {
  if (vizUrl.indexOf('http') != 0) {
      vizUrl = 'http://' + vizUrl;
  }

  // In case they copied a url directly from the browser, we will get everything in the hash instead of path :(
  if (vizUrl.indexOf('/#/') > 0) {
      vizUrl = vizUrl.replace('/#/', '/');
  }

  // Use this hack: https://gist.github.com/jlong/2428561
  let url = doc.createElement('a');
  url.href = vizUrl;

  let urlPath = url.pathname;
  let pathComponents = urlPath.split('/');
  let site = '';
  let workbookName = undefined;
  let viewName = undefined;
  let customViewName = '';
  let viewIndex = -1;
  for (let i = 0; i < pathComponents.length; i++) {
      const component = pathComponents[i];
      if (!component) {
        continue;
      }

      if (viewIndex == -1 && component === 'views') {
          viewIndex = i;
      }

      if (viewIndex == -1 && component != 'site' && component != '#') {
        site += '/' + component;
      }


      if (viewIndex != -1) {
          if (viewIndex + 1 == i) {
              workbookName = component;
          } else if (viewIndex + 2 == i) {
              viewName = component;
          }
      }
  }

  if (viewIndex < 0 || !workbookName || !viewName) {
      throw 'Invalid Url';
  }

  // Check to see if we have a custom view. if so, it will come in the form of view/<workbook>/<view>/<username>/<customViewName>
  debugger;
  if (viewIndex + 5 == pathComponents.length) {
      customViewName = pathComponents[viewIndex + 3] + '/' + pathComponents[viewIndex + 4];
  }

  let result = {
      server: url.protocol + '//' + url.host,
      site: site,
      workbook: workbookName,
      view: viewName,
      customView: customViewName,
      showTabs: false,
      showToolbar: false
  };

  let sanitizedUrl = result.server;
  if (result.site) {
    sanitizedUrl += site;
  }

  sanitizedUrl += '/views/' + result.workbook + '/' + result.view;

  if (result.customView) {
      sanitizedUrl += '/' + result.customView;
  }

  result.sanitizedUrl = sanitizedUrl;
  return result;
};

export { ParseTableauUrl };