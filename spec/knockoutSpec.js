var IfpaTgpTournament = require('../src/IfpaTgpTournament');

describe('A Knockout tournament', function() {
  var tournament;

  beforeEach(function() {
    tournament = new IfpaTgpTournament();
    tournament.setFormat('knockout');
  });

  it('can set strike count', function() {
    tournament.setStrikes(2);
    expect(tournament.strikes).toBe(2);
  });

  it('provides meaningful games with strikes not set', function() {
    expect(tournament.getMeaningfulGames()).toBe(0);

    tournament.setPlayersPerGame(2);
    expect(tournament.getMeaningfulGames()).toBe(0);
  });

  it('throws error when elimination count is too large', function() {
    var foo = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(16);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(foo).toThrowError('You cannot give all players a strike');
  });

});
