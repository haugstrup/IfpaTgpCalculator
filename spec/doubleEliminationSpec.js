var IfpaTgpTournament = require('../src/IfpaTgpTournament');

describe('A Double Elimination tournament', function() {
  var tournament;

  beforeEach(function() {
    tournament = new IfpaTgpTournament();
    tournament.setFormat('double_elimination');
  });

  it('can set double elimination games per round', function() {
    tournament.setDoubleEliminationGamesPerRound('1:1');
    expect(tournament.doubleEliminationGamesPerRound).toBe('1:1');
  });

  it('provides meaningful games with not all settings set', function() {
    expect(tournament.getMeaningfulGames()).toBe(0);

    tournament.setDoubleEliminationGamesPerRound('1:1');
    expect(tournament.getMeaningfulGames()).toBe(0);
  });

  it('throws error if player count is out of bounds', function() {
    // Best of 1:1
    var firstTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(512);
      tournament.setDoubleEliminationGamesPerRound('1:1');
      tournament.getMeaningfulGames();
    };
    expect(firstTooMany).toThrowError('You have too many or too few players players');

    var firstTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('1:1');
      tournament.getMeaningfulGames();
    };
    expect(firstTooFew).toThrowError('You have too many or too few players players');

    // Best of 3:1
    var secondTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(512);
      tournament.setDoubleEliminationGamesPerRound('3:1');
      tournament.getMeaningfulGames();
    };
    expect(secondTooMany).toThrowError('You have too many or too few players players');

    var secondTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('3:1');
      tournament.getMeaningfulGames();
    };
    expect(secondTooFew).toThrowError('You have too many or too few players players');

    // Best of 3:3
    var thirdTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(512);
      tournament.setDoubleEliminationGamesPerRound('3:3');
      tournament.getMeaningfulGames();
    };
    expect(thirdTooMany).toThrowError('You have too many or too few players players');

    var thirdTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('3:3');
      tournament.getMeaningfulGames();
    };
    expect(thirdTooFew).toThrowError('You have too many or too few players players');

    // Best of 5:1
    var fourthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(128);
      tournament.setDoubleEliminationGamesPerRound('5:1');
      tournament.getMeaningfulGames();
    };
    expect(fourthTooMany).toThrowError('You have too many or too few players players');

    var fourthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('5:1');
      tournament.getMeaningfulGames();
    };
    expect(fourthTooFew).toThrowError('You have too many or too few players players');

    // Best of 5:3
    var fifthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(64);
      tournament.setDoubleEliminationGamesPerRound('5:3');
      tournament.getMeaningfulGames();
    };
    expect(fifthTooMany).toThrowError('You have too many or too few players players');

    var fifthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('5:3');
      tournament.getMeaningfulGames();
    };
    expect(fifthTooFew).toThrowError('You have too many or too few players players');

    // Best of 5:5
    var sixthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(32);
      tournament.setDoubleEliminationGamesPerRound('5:5');
      tournament.getMeaningfulGames();
    };
    expect(sixthTooMany).toThrowError('You have too many or too few players players');

    var sixthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('5:5');
      tournament.getMeaningfulGames();
    };
    expect(sixthTooFew).toThrowError('You have too many or too few players players');

    // Best of 7:1
    var seventhTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(64);
      tournament.setDoubleEliminationGamesPerRound('7:1');
      tournament.getMeaningfulGames();
    };
    expect(seventhTooMany).toThrowError('You have too many or too few players players');

    var seventhTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('7:1');
      tournament.getMeaningfulGames();
    };
    expect(seventhTooFew).toThrowError('You have too many or too few players players');

    // Best of 7:3
    var eighthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(32);
      tournament.setDoubleEliminationGamesPerRound('7:3');
      tournament.getMeaningfulGames();
    };
    expect(eighthTooMany).toThrowError('You have too many or too few players players');

    var eighthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('7:3');
      tournament.getMeaningfulGames();
    };
    expect(eighthTooFew).toThrowError('You have too many or too few players players');

    // Best of 7:5
    var ninthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(16);
      tournament.setDoubleEliminationGamesPerRound('7:5');
      tournament.getMeaningfulGames();
    };
    expect(ninthTooMany).toThrowError('You have too many or too few players players');

    var ninthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('7:5');
      tournament.getMeaningfulGames();
    };
    expect(ninthTooFew).toThrowError('You have too many or too few players players');

    // Best of 7:7
    var tenthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(16);
      tournament.setDoubleEliminationGamesPerRound('7:7');
      tournament.getMeaningfulGames();
    };
    expect(tenthTooMany).toThrowError('You have too many or too few players players');

    var tenthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('7:7');
      tournament.getMeaningfulGames();
    };
    expect(tenthTooFew).toThrowError('You have too many or too few players players');
  });

  it('provides meaningful games for best of 1:1', function() {
    tournament.setDoubleEliminationGamesPerRound('1:1');

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(5);

    tournament.setPlayers(15);
    expect(tournament.getMeaningfulGames()).toBe(6);

    tournament.setPlayers(31);
    expect(tournament.getMeaningfulGames()).toBe(7);

    tournament.setPlayers(63);
    expect(tournament.getMeaningfulGames()).toBe(8);

    tournament.setPlayers(127);
    expect(tournament.getMeaningfulGames()).toBe(9);

    tournament.setPlayers(255);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setPlayers(511);
    expect(tournament.getMeaningfulGames()).toBe(11);
  });

  it('provides meaningful games for best of 3:1', function() {
    tournament.setDoubleEliminationGamesPerRound('3:1');

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(8);

    tournament.setPlayers(15);
    expect(tournament.getMeaningfulGames()).toBe(11);

    tournament.setPlayers(31);
    expect(tournament.getMeaningfulGames()).toBe(13);

    tournament.setPlayers(63);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(127);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(255);
    expect(tournament.getMeaningfulGames()).toBe(21);

    tournament.setPlayers(511);
    expect(tournament.getMeaningfulGames()).toBe(23);
  });

  it('provides meaningful games for best of 3:3', function() {
    tournament.setDoubleEliminationGamesPerRound('3:3');

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(13);

    tournament.setPlayers(15);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(31);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(63);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(127);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(255);
    expect(tournament.getMeaningfulGames()).toBe(25);

    tournament.setPlayers(511);
    expect(tournament.getMeaningfulGames()).toBe(28);
  });

  it('provides meaningful games for best of 5:1', function() {
    tournament.setDoubleEliminationGamesPerRound('5:1');

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(11);

    tournament.setPlayers(15);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(31);
    expect(tournament.getMeaningfulGames()).toBe(19);

    tournament.setPlayers(63);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(127);
    expect(tournament.getMeaningfulGames()).toBe(27);
  });

  it('provides meaningful games for best of 5:3', function() {
    tournament.setDoubleEliminationGamesPerRound('5:3');

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(15);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(31);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(63);
    expect(tournament.getMeaningfulGames()).toBe(28);
  });

  it('provides meaningful games for best of 5:5', function() {
    tournament.setDoubleEliminationGamesPerRound('5:5');

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(15);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(31);
    expect(tournament.getMeaningfulGames()).toBe(28);
  });

  it('provides meaningful games for best of 7:1', function() {
    tournament.setDoubleEliminationGamesPerRound('7:1');

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(15);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(31);
    expect(tournament.getMeaningfulGames()).toBe(25);

    tournament.setPlayers(63);
    expect(tournament.getMeaningfulGames()).toBe(31);
  });

  it('provides meaningful games for best of 7:3', function() {
    tournament.setDoubleEliminationGamesPerRound('7:3');

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(19);

    tournament.setPlayers(15);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(31);
    expect(tournament.getMeaningfulGames()).toBe(30);
  });

  it('provides meaningful games for best of 7:5', function() {
    tournament.setDoubleEliminationGamesPerRound('7:5');

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(15);
    expect(tournament.getMeaningfulGames()).toBe(29);
  });

  it('provides meaningful games for best of 7:7', function() {
    tournament.setDoubleEliminationGamesPerRound('7:7');

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(28);

    tournament.setPlayers(15);
    expect(tournament.getMeaningfulGames()).toBe(33);
  });

});
