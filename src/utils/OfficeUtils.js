import * as Cookies from 'cookies-js';

const RunningInOffice = () => {
  const val = Cookies.get('mockOffice');
  return !val;
}

const MarkAsMock = () => {
  Cookies.set('mockOffice', true);
  window.location.reload();
}

const LoadSetting = (key) => {
  let val = '';
  if (RunningInOffice() && Office.context.document) {
    let settings = Office.context.document.settings;
    val = settings.get(key);
  } else {
    val = Cookies.get(key);
  }

  if (val) {
    return JSON.parse(val);
  }
}

const SaveSetting = (key, val, doneCb) => {
  const valString = (typeof val === 'object') ? JSON.stringify(val) : val;
  const msg = JSON.stringify({action: 'saveSetting', key: key, val: valString});
  if (RunningInOffice()) {
    let settings = Office.context.document.settings;
    settings.set(key, valString);
    settings.saveAsync(doneCb);
  } else {
    Cookies.set(key, valString);
    doneCb();
  }
}

const CloseDialog = () => {
  const homeUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "#";
  window.location.href = homeUrl;
}

const ShowSettings = (cb) => {
  const settingsUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "#settings";
  window.location.href = settingsUrl;
}

export { RunningInOffice, MarkAsMock, LoadSetting, SaveSetting, CloseDialog, ShowSettings }