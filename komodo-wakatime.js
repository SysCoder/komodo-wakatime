

var time = 0;
var api_key = '';
var view = null;

function initExtension() {
  var prefs = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
  pref_name = 'wakatime_api_key';
  if (!prefs.hasStringPref(pref_name) || prefs.getStringPref(pref_name) === '') {
    api_key = promptForAPIKey();
    prefs.setStringPref('wakatime_api_key', api_key);
  }
}

function promptForAPIKey() {
  return ko.dialogs.prompt("[WakaTime] Enter your wakatime.com api key:")
}

function getFileName() {
  return view.koDoc.file.displayPath;
}

function enoughTimePassed() {
  d = new Date();
  if ((d.getTime - time) > 10000) {
    time = d.getTime()
    return false
  }
  return true
}

function sendDataToAPI(writeFlag) {
  writeFlag = typeof writeFlag !== 'undefined' ? writeFlag : false;
  cmdWriteFlag = writeFlag ? '--write' : '';
  fileName = getFileName();
  alert(fileName);
  var cmd = 'python /Users/marcelluspelcher/.vim/bundle/vim-wakatime/plugin/packages/wakatime/wakatime-cli.py ' + cmdWriteFlag + ' --file ' + fileName + ' --plugin komodo/0.1';
  var runSvc = Components.classes["@activestate.com/koRunService;1"].createInstance(Components.interfaces.koIRunService);
  var process = runSvc.RunAndNotify(cmd, '', '', '');
}

function keyPressEvent() {
  sendDataToAPI();
}

function fileSaveEvent() {
  alert("Filesaved");
  sendDataToAPI(true);
}


function startKeyPressEvent() {
  if (enoughTimePassed()) {
      alert(time);
      keyPressEvent();
  }
}

function toggleOn() {
  view = ko.views.manager.currentView;
  view.addEventListener('keypress', keyPressEvent, true);
  view.addEventListener('file_saved', fileSaveEvent, true);
  view.addEventListener('view_closing', toggleOff, true);
}

function toggleOff() {
  view.removeEventListener('keypress', keyPressEvent, true);
  view.removeEventListener('file_saved', fileSaveEvent, true);
  view.removeEventListener('view_closing', toggleOff, true);
}

function toggleOffThenOn() {
  toggleOff();
  toggleOn();
}


initExtension();
window.addEventListener('current_view_changed', toggleOffThenOn, true);

#komodo-ui-started  Sent after Komodo startup UI initialization is complete. Sent to the window.