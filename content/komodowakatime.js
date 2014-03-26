

var komodoWakatime = {
    action_frequency: 2,
    time: 0,
    api_key: '',
    view: null,
    fileName: '',
    keyPressListener: null,
    
        
    
    onLoad: function(thisObject) {
        thisObject.promptForAPIKey();
        var prefs = Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
        pref_name = 'wakatime_api_key';
        komodoWakatime.initViewListener(komodoWakatime);
        if (!prefs.hasStringPref(pref_name) || prefs.getStringPref(pref_name) === '') {
          thisObject.api_key = thisObject.promptForAPIKey();
          prefs.setStringPref('wakatime_api_key', thisObject.api_key);
        } else {
          thisObject.api_key = prefs.getStringPref(pref_name);
        }
    },
     
    apiClientLocation: function() {
        currProfPath = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("PrefD", Components.interfaces.nsILocalFile).path;
        PLUGIN_DIR = currProfPath + '/extensions/komodo-wakatime@wakatime.com';
        return PLUGIN_DIR + '/components/wakatime/wakatime-cli.py';
    },
    
    promptForAPIKey: function() {
      return ko.dialogs.prompt("[WakaTime] Enter your wakatime.com api key:")
    },

    getFileName: function (thisObject) {
      return thisObject.fileName;
    },
    
    enoughTimePassed: function(thisObject) {
      alert("Check for time");
      d = new Date();
      if ((d.getTime() - thisObject.time) > thisObject.action_frequency * 60000) {
        thisObject.time = d.getTime()
        return true;
      }
      return false;
    },
     
    sendDataToAPI: function(thisObject, writeFlag) {
      alert("send data"); 
      writeFlag = typeof writeFlag !== 'undefined' ? writeFlag : false;
      cmdWriteFlag = writeFlag ? '--write' : '';
      fileName = thisObject.getFileName(thisObject);
      
      var cmd = 'python ' + thisObject.apiClientLocation().replace(/(@)/g, "\\@").replace(/(\s)/g, "\\ ") + ' ' + cmdWriteFlag + ' --file ' + fileName + ' --plugin komodo/0.4.4';
      var runSvc = Components.classes["@activestate.com/koRunService;1"].createInstance(Components.interfaces.koIRunService);
      var process = runSvc.RunAndNotify(cmd, '', '', '');
      alert(cmd);
    },
    
    keyPressEvent: function(thisObject) {
      if (thisObject.enoughTimePassed(thisObject)) {
        thisObject.sendDataToAPI(thisObject);
      }
    },
     
    fileSaveEvent: function(thisObject, event) {
      thisObject.sendDataToAPI(thisObject, true);
    },
    
   
    initViewListener: function(thisObject) { 
      alert("initViewListener");
      if (thisObject.view !== null) {
        thisObject.view.removeEventListener('keypress', thisObject.keyPressListener, true);
      }
      
      thisObject.keyPressListener = function(event) { thisObject.keyPressEvent(thisObject, event); };
      thisObject.view = ko.views.manager.currentView;
      thisObject.view.addEventListener('keypress', thisObject.keyPressListener, true);
    },
  
    fileChanged: function(thisObject, event) {
      thisObject.fileName = event.originalTarget.koDoc.file.displayPath;
      ko.views.manager.currentView.removeEventListener('keypress', thisObject.keyPressListener, true);
      thisObject.keyPressListener = function(event) { thisObject.keyPressEvent(thisObject, event); };
      thisObject.view = event.originalTarget;
      thisObject.view.addEventListener('keypress', thisObject.keyPressListener, true);
      alert(thisObject.fileName);
    }
}  

window.addEventListener('file_saved', function(event) { komodoWakatime.fileSaveEvent(komodoWakatime, event); }, false);
window.addEventListener('current_view_changed', function(event) { komodoWakatime.fileChanged(komodoWakatime, event); }, true);
window.addEventListener('komodo-ui-started', function(event) { komodoWakatime.onLoad(komodoWakatime, event); }, true);
