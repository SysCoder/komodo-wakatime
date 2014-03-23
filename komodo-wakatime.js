

var time = 0;

function keyPressEvent() {
  var cmd = 'python /Users/marcelluspelcher/.vim/bundle/vim-wakatime/plugin/packages/wakatime/wakatime-cli.py --file /Users/marcelluspelcher/wakatime_komodo/komodo-wakatime.js --plugin komodo/0.1';
  var runSvc = Components.classes["@activestate.com/koRunService;1"].createInstance(Components.interfaces.koIRunService);
  var process = runSvc.RunAndNotify(cmd, '', '', '');
}


function startKeyPressEvent() {
  d = new Date();
  if (time < (d.getTime() - 10000)) {
      alert(time);
      keyPressEvent();
      time = d.getTime()
  }
}


var view = ko.views.manager.currentView;

view.addEventListener('keypress', startKeyPressEvent, true);

kjfkjkldjakfjljksjkfjlkdjlajflkjdkjlfjkajdfjlakjfkjdlkjfklajdkjflkajfkljdalkjfkajldfjklafjkljfkljdkljafkljkldjfjfkdjlafkjkfljaflkajkljfkl
jkldjflkdjaflkjdkljakljkldajfkljakldjfklajkdfjkljalfjdjkajljfkljafjljadkfjkajlfdkjfaljdkfjljkfljakjflajfklalf
jklfjdlkjalkjfkdjlkdafadfafdaffdjklfjakdfja;lkdfjlkajfkjljdkjfljfjkldjklfjkldjfioajfiljaifjljfkjfkljfdjkfjldjfkaljfkljafjfa

