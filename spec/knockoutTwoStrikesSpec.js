var IfpaTgpTournament = require('../src/IfpaTgpTournament');

describe('A Two-Strikes Knockout tournament', function() {
  var tournament;

  beforeEach(function() {
    tournament = new IfpaTgpTournament();
    tournament.setFormat('knockout');
    tournament.setStrikes(2);
  });

  it('throws error on best-of-X and more than two players', function() {
    // Best-of-1 Matches (2 players with 1 strike per match)
    var foo = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(16);
      tournament.setGamesPerRound(3);
      tournament.getMeaningfulGames();
    };
    expect(foo).toThrowError('Best-of-X is only supported for head-to-head tournaments');
  });

  it('throws error if player count is out of bounds', function() {
    // Best-of-1 Matches (2 players with 1 strike per match)
    var aTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(128);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(aTooMany).toThrowError('You can have no more than 127 players');

    var aTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(1);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(aTooFew).toThrowError('You need at least 2 players');

    // Best-of-1 Matches (3 player matches - 2nd/3rd place get strikes)
    var bTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(513);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(bTooMany).toThrowError('You can have no more than 512 players');
    var bTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(5);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(bTooFew).toThrowError('You need at least 6 players');

    // Best-of-1 Matches (3 player matches - 3rd place get strike - receives 1.5X bonus for 3-player games)
    var cTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(141);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(cTooMany).toThrowError('You can have no more than 140 players');
    var cTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(5);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(cTooFew).toThrowError('You need at least 6 players');

    // Best-of-1 Matches (4 player matches - 2nd/3rd/4th place get strikes - receives 2X bonus for 4-player games)
    var dTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(512);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(3);
      tournament.getMeaningfulGames();
    };
    expect(dTooMany).toThrowError('You can have no more than 511 players');
    var dTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(7);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(3);
      tournament.getMeaningfulGames();
    };
    expect(dTooFew).toThrowError('You need at least 8 players');

    // Best-of-1 Matches (4 player matches - 3rd/4th place get strikes - receives 2X bonus for 4-player games)
    var eTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(257);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(eTooMany).toThrowError('You can have no more than 256 players');
    var eTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(7);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(eTooFew).toThrowError('You need at least 8 players');

    // Best-of-1 Matches (4 player matches - 4th place get strikes - receives 2X bonus for 4-player games)
    var fTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(16);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(fTooMany).toThrowError('You can have no more than 15 players');
    var fTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(7);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(fTooFew).toThrowError('You need at least 8 players');

    // Best-of-3 Matches (2 players with 1 strike per match)
    var gTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(64);
      tournament.setGamesPerRound(3);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(gTooMany).toThrowError('You can have no more than 63 players');

    var gTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(3);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(gTooFew).toThrowError('You need at least 4 players');

    // Best-of-5 Matches (2 players with 1 strike per match)
    var hTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(9);
      tournament.setGamesPerRound(5);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(hTooMany).toThrowError('You can have no more than 8 players');

    var hTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(5);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(hTooFew).toThrowError('You need at least 4 players');

    // Best-of-7 Matches (2 players with 1 strike per match)
    var iTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(5);
      tournament.setGamesPerRound(7);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(iTooMany).toThrowError('You can have no more than 4 players');

    var iTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(2);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(7);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(iTooFew).toThrowError('You need at least 4 players');
  });

  it('provides meaningful games', function() {
    tournament.setStrikes(2);

    // Best-of-1 Matches (2 players with 1 strike per match)
    tournament.setPlayersPerGame(2);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(1);

    tournament.setPlayers(2);
    expect(tournament.getMeaningfulGames()).toBe(3);

    tournament.setPlayers(3);
    expect(tournament.getMeaningfulGames()).toBe(4);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(5);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(6);

    tournament.setPlayers(14);
    expect(tournament.getMeaningfulGames()).toBe(7);

    tournament.setPlayers(23);
    expect(tournament.getMeaningfulGames()).toBe(8);

    tournament.setPlayers(39);
    expect(tournament.getMeaningfulGames()).toBe(9);

    tournament.setPlayers(63);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setPlayers(127);
    expect(tournament.getMeaningfulGames()).toBe(11);

    // Best-of-1 Matches (3 player matches - 2nd/3rd place get strikes)
    tournament.setPlayersPerGame(3);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(2);

    tournament.setPlayers(9);
    expect(tournament.getMeaningfulGames()).toBe(6);

    tournament.setPlayers(26);
    expect(tournament.getMeaningfulGames()).toBe(8);

    tournament.setPlayers(27);
    expect(tournament.getMeaningfulGames()).toBe(9);

    tournament.setPlayers(80);
    expect(tournament.getMeaningfulGames()).toBe(11);

    tournament.setPlayers(216);
    expect(tournament.getMeaningfulGames()).toBe(12);

    tournament.setPlayers(512);
    expect(tournament.getMeaningfulGames()).toBe(14);

    // Best-of-1 Matches (3 player matches - 3rd place get strike - receives 1.5X bonus for 3-player games)
    tournament.setPlayersPerGame(3);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(1);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setPlayers(9);
    expect(tournament.getMeaningfulGames()).toBe(11);

    tournament.setPlayers(11);
    expect(tournament.getMeaningfulGames()).toBe(12);

    tournament.setPlayers(14);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(19);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(26);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(40);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(52);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(71);
    expect(tournament.getMeaningfulGames()).toBe(21);

    tournament.setPlayers(98);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(139);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(140);
    expect(tournament.getMeaningfulGames()).toBe(26);

    // Best-of-1 Matches (4 player matches - 2nd/3rd/4th place get strikes - receives 2X bonus for 4-player games)
    tournament.setPlayersPerGame(4);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(3);

    tournament.setPlayers(15);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setPlayers(52);
    expect(tournament.getMeaningfulGames()).toBe(12);

    tournament.setPlayers(169);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(511);
    expect(tournament.getMeaningfulGames()).toBe(16);

    // Best-of-1 Matches (4 player matches - 3rd/4th place get strikes - receives 2X bonus for 4-player games)
    tournament.setPlayersPerGame(4);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(2);

    tournament.setPlayers(14);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(23);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(39);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(63);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(127);
    expect(tournament.getMeaningfulGames()).toBe(22);

    tournament.setPlayers(255);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(256);
    expect(tournament.getMeaningfulGames()).toBe(26);

    // Best-of-1 Matches (4 player matches - 4th place get strikes - receives 2X bonus for 4-player games)
    tournament.setPlayersPerGame(4);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(1);

    tournament.setPlayers(8);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(10);
    expect(tournament.getMeaningfulGames()).toBe(22);

    tournament.setPlayers(14);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(15);
    expect(tournament.getMeaningfulGames()).toBe(26);

    // Best-of-3 Matches (2 players with 1 strike per match)
    tournament.setPlayersPerGame(2);
    tournament.setGamesPerRound(3);
    tournament.setEliminationCount(1);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(13);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(8);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(14);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(16);
    expect(tournament.getMeaningfulGames()).toBe(19);

    tournament.setPlayers(23);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(24);
    expect(tournament.getMeaningfulGames()).toBe(21);

    tournament.setPlayers(39);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(40);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(63);
    expect(tournament.getMeaningfulGames()).toBe(25);

    // Best-of-5 Matches (2 players with 1 strike per match)
    tournament.setPlayersPerGame(2);
    tournament.setGamesPerRound(5);
    tournament.setEliminationCount(1);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(22);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(8);
    expect(tournament.getMeaningfulGames()).toBe(26);

    // Best-of-7 Matches (2 players with 1 strike per match)
    tournament.setPlayersPerGame(2);
    tournament.setGamesPerRound(7);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(28);

  });


});
