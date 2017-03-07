const vizConfigProps = ['sanitizedUrl' , 'server' , 'site' , 'workbook' , 'view' , 'customView' , 'showTabs' , 'showToolbar'];

const ValidateVizConfig = (vizConfig) => {
  // Really the only thing that matters is we have a valid sanitizedUrl
  return vizConfig && !!vizConfig.sanitizedUrl;
}

const TakeVizConfigProps = (vizConfig) => {
  var result = {};
  for (const i in vizConfigProps) {
    const prop = vizConfigProps[i];
    result[prop] = vizConfig.hasOwnProperty(prop) ? vizConfig[prop] : undefined;
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