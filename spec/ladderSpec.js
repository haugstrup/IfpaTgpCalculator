var IfpaTgpTournament = require('../src/IfpaTgpTournament');

describe('A Ladder tournament', function() {
  var tournament;

  beforeEach(function() {
    tournament = new IfpaTgpTournament();
    tournament.setFormat('ladder');
  });

  it('provides meaningful games with not all settings set', function() {
    expect(tournament.getMeaningfulGames()).toBe(0);

    tournament.setPlayersPerGame(3);
    expect(tournament.getMeaningfulGames()).toBe(0);
  });

  it('throws error with players per game set to 2', function() {
    var foo = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('ladder');
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(16);
      tournament.getMeaningfulGames();
    };
    expect(foo).toThrowError('Ladder tournaments cannot be head-to-head');
  });

  it('throws error if player count is out of bounds', function() {
    // 4 player groups
    var firstTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('ladder');
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(272);
      tournament.getMeaningfulGames();
    };
    expect(firstTooMany).toThrowError('You have too many or too few players players');

    var firstTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('ladder');
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(3);
      tournament.getMeaningfulGames();
    };
    expect(firstTooFew).toThrowError('You have too many or too few players players');

    // 3 player groups
    var secondTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('ladder');
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(454);
      tournament.getMeaningfulGames();
    };
    expect(secondTooMany).toThrowError('You have too many or too few players players');

    var secondTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('ladder');
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(3);
      tournament.getMeaningfulGames();
    };
    expect(secondTooFew).toThrowError('You have too many or too few players players');
  });

  it('provides meaningful games for four player groups', function() {
    tournament.setPlayersPerGame(4);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(2);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(3);

    tournament.setPlayers(6);
    expect(tournament.getMeaningfulGames()).toBe(5);

    tournament.setPlayers(12);
    expect(tournament.getMeaningfulGames()).toBe(6);

    tournament.setPlayers(44);
    expect(tournament.getMeaningfulGames()).toBe(7);

    tournament.setPlayers(271);
    expect(tournament.getMeaningfulGames()).toBe(8);
  });

  it('provides meaningful games for three player groups', function() {
    tournament.setPlayersPerGame(3);

    tournament.setPlayers(10);
    expect(tournament.getMeaningfulGames()).toBe(2);

    tournament.setPlayers(453);
    expect(tournament.getMeaningfulGames()).toBe(3);
  });

});
