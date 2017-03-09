import * as Cookies from 'cookies-js';

/*global Office:true*/

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
  if (RunningInOffice()) {
    let settings = Office.context.document.settings;
    settings.set(key, valString);
    settings.saveAsync(doneCb);
  } else {
    Cookies.set(key, valString);
    doneCb();
  }
}

const MakeUrl = (target) => {
  target = target || '';
  const result = window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + target;
  return result;
}

const CloseDialog = () => {
  const homeUrl = MakeUrl();
  window.location.href = homeUrl;
}

const ShowSettings = () => {
  const settingsUrl = MakeUrl('#settings');
  window.location.href = settingsUrl;
}

export { RunningInOffice, MarkAsMock, LoadSetting, SaveSetting, CloseDialog, ShowSettings }