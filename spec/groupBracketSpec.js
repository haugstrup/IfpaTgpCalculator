var IfpaTgpTournament = require('../src/IfpaTgpTournament');

describe('A Group Bracket tournament', function() {
  var tournament;

  beforeEach(function() {
    tournament = new IfpaTgpTournament();
    tournament.setFormat('group_bracket');
  });

  it('provides meaningful games with not all settings set', function() {
    expect(tournament.getMeaningfulGames()).toBe(0);

    tournament.setPlayersPerGame(4);
    expect(tournament.getMeaningfulGames()).toBe(0);
  });

  it('throws error when games per round is not 3 or 4', function() {
    var foo = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('group_bracket');
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(16);
      tournament.setGamesPerRound(1);
      tournament.getMeaningfulGames();
    };
    expect(foo).toThrowError('Can only calculate group bracket tournaments with 3 or 4 games per round');
  });

  it('throws error with players per game is not four', function() {
    var foo = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('group_bracket');
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(16);
      tournament.setGamesPerRound(3);
      tournament.getMeaningfulGames();
    };
    expect(foo).toThrowError('Group bracket tournaments must be four-player groups');
  });

  it('throws error if player count is out of bounds', function() {
    // 3 game rounds
    var firstTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('group_bracket');
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(92);
      tournament.setGamesPerRound(3);
      tournament.getMeaningfulGames();
    };
    expect(firstTooMany).toThrowError('You have too many or too few players players');

    var firstTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('group_bracket');
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(3);
      tournament.getMeaningfulGames();
    };
    expect(firstTooFew).toThrowError('You have too many or too few players players');

    // 4 game rounds
    var secondTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('group_bracket');
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(46);
      tournament.setGamesPerRound(4);
      tournament.getMeaningfulGames();
    };
    expect(secondTooMany).toThrowError('You have too many or too few players players');

    var secondTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('group_bracket');
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(4);
      tournament.getMeaningfulGames();
    };
    expect(secondTooFew).toThrowError('You have too many or too few players players');
  });

  it('provides meaningful games for 3 game rounds', function() {
    tournament.setPlayersPerGame(4);
    tournament.setGamesPerRound(3);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(6);

    tournament.setPlayers(11);
    expect(tournament.getMeaningfulGames()).toBe(12);

    tournament.setPlayers(22);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(45);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(91);
    expect(tournament.getMeaningfulGames()).toBe(30);
  });

  it('provides meaningful games for 4 game rounds', function() {
    tournament.setPlayersPerGame(4);
    tournament.setGamesPerRound(4);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(8);

    tournament.setPlayers(11);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(22);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(45);
    expect(tournament.getMeaningfulGames()).toBe(32);
  });

});
