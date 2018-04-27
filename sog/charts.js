var container = document.getElementById('container');
var colors = {
  PIT: 'rgb(252, 181, 20)',
  WSH: 'rgb(4, 30, 65)',
  NJD: 'rgb(206, 17, 38)',
  TBL: 'rgba(0, 40, 104, 1)',
  TOR: 'RGBA(0, 32, 91, 1)',
  BOS: 'RGBA(252, 181, 20, 1)',
  CBJ: 'RGBA(206, 17, 38, 1)',
  PHI: 'RGBA(247, 73, 2, 1)',
  NSH: 'RGBA(252, 181, 20, 1)',
  COL: 'RGBA(117, 38, 61, 1)',
  WIN: 'RGBA(4, 30, 65, 1)',
  MIN: 'RGBA(2, 73, 48, 1)',
  VGK: 'RGBA(137, 115, 76, 1)',
  LAK: 'RGBA(17, 17, 17, 1)',
  ANA: 'RGBA(181, 152, 90, 1)',
  SJS: 'RGBA(0, 109, 117, 1)'
}

var gameStructureElements = function() {
  var _gameElem = document.createElement('div');
  _gameElem.className = 'games';

  var _elem = document.createElement('div');
  var _0 = document.createElement('div');
  _0.className = 'time_zero';
  var _20 = document.createElement('div');
  _20.className = 'time_twenty';
  var _40 = document.createElement('div');
  _40.className = 'time_forty';
  var _60 = document.createElement('div');
  _60.className = 'time_sixty';

  _elem.appendChild(_0);
  _elem.appendChild(_20);
  _elem.appendChild(_40);
  _elem.appendChild(_60);

  _gameElem.appendChild(_elem);

  return _gameElem;
}

data.forEach(function(group) {
  var _groupElem = document.createElement('group');
  _groupElem.className = 'group';
  var _headingElem = document.createElement('h2');
  _headingElem.innerHTML = '<span class="name" style="color: ' + colors[group.prettyCode[0]] + '">' + group.prettyName[0] + '</span> vs. <span class="name" style="color: ' + colors[group.prettyCode[1]] + '">' + group.prettyName[1] + '</span>';

  _groupElem.appendChild(_headingElem);

  var _gamesElem = gameStructureElements();

  group.games.forEach(function(game) {
    var _gameElem = document.createElement('div');
    _gameElem.id = game.gameData.game.pk;
    _gameElem.className = 'game';

    var roundElem = document.createElement('span');
    roundElem.className = 'round';
    roundElem.innerText = 'Game ' + (('' + game.gameData.game.pk).split('').pop());

    _gameElem.appendChild(roundElem);

    game.shots.forEach(function(shots) {
      var _teamElem = document.createElement('div');
      _teamElem.className = 'team';
      _gameElem.appendChild(_teamElem);

      shots.shots.forEach(function(shot) {
        if (((shot.elapsedSeconds / 3600) * 100) < 100) { // exclude OT lol
          var _elem = document.createElement('div');

          if (shot.type === 'MISSED_SHOT') {
            _elem.className = 'missed';
            _elem.style.left = 'calc(' + ((shot.elapsedSeconds / 3600) * 100) + '% - 3px)';
          } else if (shot.type === 'GOAL') {
            _elem.className = 'goal';
            _elem.style.left = 'calc(' + ((shot.elapsedSeconds / 3600) * 100) + '% - 8px)';
          } else {
            _elem.className = 'shot';
            _elem.style.left = 'calc(' + ((shot.elapsedSeconds / 3600) * 100) + '% - 5px)';
          }

          _elem.style.background = colors[shots.triCode];
            _teamElem.appendChild(_elem);
        }
      });
    });

    _gamesElem.appendChild(_gameElem);
  });

  _groupElem.appendChild(_gamesElem);
  container.appendChild(_groupElem);
});