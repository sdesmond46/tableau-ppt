import * as Cookies from 'cookies-js';

const RunningInOffice = () => {
  const val = Cookies.get('mockOffice');
  return !val;
}

const MarkAsMock = () => {
  Cookies.set('mockOffice', true);
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
    // Check to see if we are in the dialog, if so we need to pass this message to the parent
    if (Office.context && Office.context.ui && Office.context.ui.messageParent) {
      Office.context.ui.messageParent(msg);
      doneCb();
    } else {
      let settings = Office.context.document.settings;
      settings.set(key, valString);
      settings.saveAsync(doneCb);
    }
  } else {
    if (window.opener) {
      // If we have a parent, we just post our message back to it
      parent.postMessage(msg, window.location.origin);
      doneCb();
    } else {
      Cookies.set(key, valString);
      doneCb();
    }
  }
}

const RunningInDialog = () => {
  return RunningInOffice() && Office.context && Office.context.ui && Office.context.ui.messageParent;
}

const CloseDialog = () => {
  const msg = JSON.stringify({action: 'closeDialog'});
  if (RunningInDialog()) {
    Office.context.ui.messageParent(msg);
  } else {
    parent.postMessage(msg, window.location.origin);
  }
}

const HandleSettingsMessage = (closeDialogFn, cb, msgEvent) => {
  var msg = JSON.parse(msgEvent.message || msgEvent.data);
  switch(msg.action) {
    case 'saveSetting': {
      SaveSetting(msg.key, msg.val, (a) => {
        closeDialogFn();
        cb();
      });
      break;
    }
    case 'closeDialog' : {
      closeDialogFn();
      cb();
      break;
    }
  }
}

const ShowSettingsOffice = (cb) => {
  // Step one for this is to actually write out the current vizConfig to a cookie for settings to find it
  const valString = JSON.stringify(LoadSetting('vizConfig'));
  Cookies.set('vizConfig', valString);

  const settingsUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "#settings";
  const targetHeight = 700;
  const targetWidth = 550;

  const dialogOptions = {
      width: Math.round(100 * (targetWidth / screen.width)),
      height: Math.round(100 * (targetHeight / screen.height)),
      displayInIframe: true
  };

  Office.context.ui.displayDialogAsync(settingsUrl, dialogOptions, function (asyncResult) {
      let dialog = asyncResult.value;

      const processMessage = HandleSettingsMessage.bind(null, cb, dialog.close);
      dialog.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogMessageReceived, processMessage);
  });
}

const ShowSettingsBrowser = (cb) => {
  const settingsUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "#settings";
  let settingsWindow = window.open(settingsUrl, '_blank', 'height=600,width=800');
  settingsWindow.addEventListener('message', HandleSettingsMessage.bind(null, () => {
    settingsWindow.close();
  }, cb));
}

const ShowSettings = (cb) => {
  if (RunningInOffice()) {
    ShowSettingsOffice(cb);
  } else {
    ShowSettingsBrowser(cb);
  }
}

export { RunningInOffice, MarkAsMock, LoadSetting, SaveSetting, CloseDialog, ShowSettings }