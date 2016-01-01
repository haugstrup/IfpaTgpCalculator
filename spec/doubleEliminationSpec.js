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
    expect(firstTooMany).toThrowError('You can have no more than 511 players');

    var firstTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('1:1');
      tournament.getMeaningfulGames();
    };
    expect(firstTooFew).toThrowError('You need at least 4 players');

    // Best of 3:1
    var secondTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(609);
      tournament.setDoubleEliminationGamesPerRound('3:1');
      tournament.getMeaningfulGames();
    };
    expect(secondTooMany).toThrowError('You can have no more than 608 players');

    var secondTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('3:1');
      tournament.getMeaningfulGames();
    };
    expect(secondTooFew).toThrowError('You need at least 4 players');

    // Best of 3:3
    var thirdTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(208);
      tournament.setDoubleEliminationGamesPerRound('3:3');
      tournament.getMeaningfulGames();
    };
    expect(thirdTooMany).toThrowError('You can have no more than 207 players');

    var thirdTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('3:3');
      tournament.getMeaningfulGames();
    };
    expect(thirdTooFew).toThrowError('You need at least 4 players');

    // Best of 5:1
    var fourthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(725);
      tournament.setDoubleEliminationGamesPerRound('5:1');
      tournament.getMeaningfulGames();
    };
    expect(fourthTooMany).toThrowError('You can have no more than 724 players');

    var fourthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('5:1');
      tournament.getMeaningfulGames();
    };
    expect(fourthTooFew).toThrowError('You need at least 4 players');

    // Best of 5:3
    var fifthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(74);
      tournament.setDoubleEliminationGamesPerRound('5:3');
      tournament.getMeaningfulGames();
    };
    expect(fifthTooMany).toThrowError('You can have no more than 73 players');

    var fifthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('5:3');
      tournament.getMeaningfulGames();
    };
    expect(fifthTooFew).toThrowError('You need at least 4 players');

    // Best of 5:5
    var sixthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(15);
      tournament.setDoubleEliminationGamesPerRound('5:5');
      tournament.getMeaningfulGames();
    };
    expect(sixthTooMany).toThrowError('You can have no more than 14 players');

    var sixthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('5:5');
      tournament.getMeaningfulGames();
    };
    expect(sixthTooFew).toThrowError('You need at least 4 players');

    // Best of 7:1
    var seventhTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(431);
      tournament.setDoubleEliminationGamesPerRound('7:1');
      tournament.getMeaningfulGames();
    };
    expect(seventhTooMany).toThrowError('You can have no more than 430 players');

    var seventhTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('7:1');
      tournament.getMeaningfulGames();
    };
    expect(seventhTooFew).toThrowError('You need at least 4 players');

    // Best of 7:3
    var eighthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(24);
      tournament.setDoubleEliminationGamesPerRound('7:3');
      tournament.getMeaningfulGames();
    };
    expect(eighthTooMany).toThrowError('You can have no more than 23 players');

    var eighthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('7:3');
      tournament.getMeaningfulGames();
    };
    expect(eighthTooFew).toThrowError('You need at least 4 players');

    // Best of 7:5
    var ninthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(8);
      tournament.setDoubleEliminationGamesPerRound('7:5');
      tournament.getMeaningfulGames();
    };
    expect(ninthTooMany).toThrowError('You can have no more than 7 players');

    var ninthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('7:5');
      tournament.getMeaningfulGames();
    };
    expect(ninthTooFew).toThrowError('You need at least 4 players');

    // Best of 7:7
    var tenthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(5);
      tournament.setDoubleEliminationGamesPerRound('7:7');
      tournament.getMeaningfulGames();
    };
    expect(tenthTooMany).toThrowError('You can have no more than 4 players');

    var tenthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('double_elimination');
      tournament.setPlayers(3);
      tournament.setDoubleEliminationGamesPerRound('7:7');
      tournament.getMeaningfulGames();
    };
    expect(tenthTooFew).toThrowError('You need at least 4 players');
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

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(8);

    tournament.setPlayers(9);
    expect(tournament.getMeaningfulGames()).toBe(9);

    tournament.setPlayers(19);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setPlayers(38);
    expect(tournament.getMeaningfulGames()).toBe(11);

    tournament.setPlayers(76);
    expect(tournament.getMeaningfulGames()).toBe(12);

    tournament.setPlayers(152);
    expect(tournament.getMeaningfulGames()).toBe(13);

    tournament.setPlayers(304);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(608);
    expect(tournament.getMeaningfulGames()).toBe(15);
  });

  it('provides meaningful games for best of 3:3', function() {
    tournament.setDoubleEliminationGamesPerRound('3:3');

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(11);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(12);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(13);

    tournament.setPlayers(9);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(12);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(17);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(22);
    expect(tournament.getMeaningfulGames()).toBe(17);

    tournament.setPlayers(29);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(39);
    expect(tournament.getMeaningfulGames()).toBe(19);

    tournament.setPlayers(51);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(68);
    expect(tournament.getMeaningfulGames()).toBe(21);

    tournament.setPlayers(90);
    expect(tournament.getMeaningfulGames()).toBe(22);

    tournament.setPlayers(119);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(157);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(207);
    expect(tournament.getMeaningfulGames()).toBe(25);
  });

  it('provides meaningful games for best of 5:1', function() {
    tournament.setDoubleEliminationGamesPerRound('5:1');

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(12);

    tournament.setPlayers(11);
    expect(tournament.getMeaningfulGames()).toBe(13);

    tournament.setPlayers(22);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(45);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(90);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(181);
    expect(tournament.getMeaningfulGames()).toBe(17);

    tournament.setPlayers(362);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(724);
    expect(tournament.getMeaningfulGames()).toBe(19);

  });

  it('provides meaningful games for best of 5:3', function() {
    tournament.setDoubleEliminationGamesPerRound('5:3');

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(6);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(17);

    tournament.setPlayers(10);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(13);
    expect(tournament.getMeaningfulGames()).toBe(19);

    tournament.setPlayers(18);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(24);
    expect(tournament.getMeaningfulGames()).toBe(21);

    tournament.setPlayers(31);
    expect(tournament.getMeaningfulGames()).toBe(22);

    tournament.setPlayers(42);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(55);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(73);
    expect(tournament.getMeaningfulGames()).toBe(25);

  });

  it('provides meaningful games for best of 5:5', function() {
    tournament.setDoubleEliminationGamesPerRound('5:5');

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(19);

    tournament.setPlayers(6);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(21);

    tournament.setPlayers(8);
    expect(tournament.getMeaningfulGames()).toBe(22);

    tournament.setPlayers(10);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(12);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(14);
    expect(tournament.getMeaningfulGames()).toBe(25);
  });

  it('provides meaningful games for best of 7:1', function() {
    tournament.setDoubleEliminationGamesPerRound('7:1');

    tournament.setPlayers(6);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(13);
    expect(tournament.getMeaningfulGames()).toBe(17);

    tournament.setPlayers(26);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(53);
    expect(tournament.getMeaningfulGames()).toBe(19);

    tournament.setPlayers(107);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(215);
    expect(tournament.getMeaningfulGames()).toBe(21);

    tournament.setPlayers(430);
    expect(tournament.getMeaningfulGames()).toBe(22);
  });

  it('provides meaningful games for best of 7:3', function() {
    tournament.setDoubleEliminationGamesPerRound('7:3');

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(19);

    tournament.setPlayers(6);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(8);
    expect(tournament.getMeaningfulGames()).toBe(21);

    tournament.setPlayers(11);
    expect(tournament.getMeaningfulGames()).toBe(22);

    tournament.setPlayers(14);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(19);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(23);
    expect(tournament.getMeaningfulGames()).toBe(25);
  });

  it('provides meaningful games for best of 7:5', function() {
    tournament.setDoubleEliminationGamesPerRound('7:5');

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(22);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(6);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(25);
  });

  it('provides meaningful games for best of 7:7', function() {
    tournament.setDoubleEliminationGamesPerRound('7:7');

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(25);

  });

});
