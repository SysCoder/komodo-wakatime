
var action_frequency = 2 //This can be received from the user settings
var time = 0;
var api_key = '';
var currProfPath = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties) .get("PrefD", Components.interfaces.nsILocalFile) .path
currProfPath
var PLUGIN_DIR = currProfPath + '/extensions/komodo-wakatime@wakatime.com';
var API_CLIENT = PLUGIN_DIR + '/components/wakatime/wakatime-cli.py';
var view = null;

function initExtension() {
  toggleOn();
  alert("start")
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
  if ((d.getTime() - time) > action_frequency * 60) {
    time = d.getTime()
    return true;
  }
  return false;
}

function sendDataToAPI(writeFlag) {
  writeFlag = typeof writeFlag !== 'undefined' ? writeFlag : false;
  cmdWriteFlag = writeFlag ? '--write' : '';
  fileName = getFileName();
  alert(fileName);
  var cmd = 'python ' + API_CLIENT + cmdWriteFlag + ' --file ' + fileName + ' --plugin komodo/0.1';
  var runSvc = Components.classes["@activestate.com/koRunService;1"].createInstance(Components.interfaces.koIRunService);
  var process = runSvc.RunAndNotify(cmd, '', '', '');
}

function keyPressEvent() {
  if (enoughTimePassed()) {
    sendDataToAPI();
  }
}

function fileSaveEvent() {
  alert("Filesaved");
  sendDataToAPI(true);
}


function toggleOn() {
  view = ko.views.manager.currentView;
  view.addEventListener('keypress', keyPressEvent, true);
}

function toggleOff() {
  view.removeEventListener('keypress', keyPressEvent, true);
}

function toggleOffThenOn() {
  toggleOff();
  //FIXME: I don't like this! I think I can rework it so it will trigger off of an event.
  setTimeout(toggleOn, 1);
}

initExtension()
window.addEventListener('file_saved', fileSaveEvent, true);
window.addEventListener('current_view_changed', toggleOffThenOn, true);
window.addEventListener('komodo-ui-started', initExtension, true);

