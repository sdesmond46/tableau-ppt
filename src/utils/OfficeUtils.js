import * as Cookies from 'cookies-js';

const RunningInOffice = () => {
  const val = Cookies.get('mockOffice');
  return !val;
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
    // Check to see if we are in the dialog, if so we need to pass this message to the parent
    if (Office.context && Office.context.ui && Office.context.ui.messageParent) {
      Office.context.ui.messageParent(JSON.stringify({action: 'saveSetting', key: key, val: valString}));
      doneCb();
    } else {
      let settings = Office.context.document.settings;
      settings.set(key, valString);
      settings.saveAsync(doneCb);
    }
  } else {
    Cookies.set(key, valString);
  }
}

const RunningInDialog = () => {
  return RunningInOffice() && Office.context && Office.context.ui && Office.context.ui.messageParent;
}

const CloseDialog = () => {
  if (RunningInDialog()) {
    Office.context.ui.messageParent(JSON.stringify({action: 'closeDialog'}));
  }
}

const ShowSettingsOffice = (cb) => {
  debugger;
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
      const processMessage = function (msgEvent) {
          var msg = JSON.parse(msgEvent.message);
          switch(msg.action) {
            case 'saveSetting': {
              SaveSetting(msg.key, msg.val, (a) => {
                dialog.close();
                cb();
              });
              break;
            }
            case 'closeDialog' : {
              dialog.close();
              cb();
              break;
            }
          }
      };

      dialog.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogMessageReceived, processMessage);
  });
}

const ShowSettings = (cb) => {
  if (RunningInOffice()) {
    ShowSettingsOffice(cb);
  }
}

export { RunningInOffice, LoadSetting, SaveSetting, CloseDialog, ShowSettings }