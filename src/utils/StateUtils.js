const vizConfigProps = ['sanitizedUrl' , 'server' , 'site' , 'workbook' , 'view' , 'customView' , 'showTabs' , 'showToolbar'];

const ValidateVizConfig = (vizConfig) => {
  // Really the only thing that matters is we have a valid sanitizedUrl
  return vizConfig && !!vizConfig.sanitizedUrl;
}

const TakeVizConfigProps = (vizConfig) => {
  var result = {};
  for (const prop of vizConfigProps) {
    result[prop] = vizConfig[prop];
  }

  return result;
}

const DefaultVizConfig = () => {
  return { 
    'sanitizedUrl': '',
    'server': '',
    'site': '',
    'workbook': '',
    'view': '',
    'customView': '',
    'showTabs': false,
    'showToolbar': false
  };
}

export { ValidateVizConfig, TakeVizConfigProps, DefaultVizConfig }