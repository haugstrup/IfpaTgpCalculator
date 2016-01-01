var IfpaTgpTournament = require('../src/IfpaTgpTournament');

describe('A Three-Strikes Knockout tournament', function() {
  var tournament;

  beforeEach(function() {
    tournament = new IfpaTgpTournament();
    tournament.setFormat('knockout');
    tournament.setStrikes(3);
  });

  it('throws error on best-of-X and more than two players', function() {
    // Best-of-1 Matches (2 players with 1 strike per match)
    var foo = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(16);
      tournament.setGamesPerRound(3);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(foo).toThrowError('Best-of-X is only supported for head-to-head tournaments');
  });

  it('throws error if player count is out of bounds', function() {
    // Best-of-1 Matches (2 players with 1 strike per match)
    var aTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(129);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(aTooMany).toThrowError('You can have no more than 128 players');

    var aTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(aTooFew).toThrowError('You need at least 4 players');

    // Best-of-1 Matches (3 player matches - 2nd/3rd place get strikes)
    var bTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
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
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(5);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(bTooFew).toThrowError('You need at least 6 players');

    // Best-of-1 Matches (3 player matches - 3rd place get strikes)
    var cTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(46);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(cTooMany).toThrowError('You can have no more than 45 players');
    var cTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(5);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(cTooFew).toThrowError('You need at least 6 players');

    // Best-of-1 Matches (4 player matches - 2nd/3rd/4th place get strikes)
    var dTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(513);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(3);
      tournament.getMeaningfulGames();
    };
    expect(dTooMany).toThrowError('You can have no more than 512 players');
    var dTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(7);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(3);
      tournament.getMeaningfulGames();
    };
    expect(dTooFew).toThrowError('You need at least 8 players');

    // Best-of-1 Matches (4 player matches - 3rd/4th place get strikes)
    var eTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(59);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(eTooMany).toThrowError('You can have no more than 58 players');
    var eTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(7);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(eTooFew).toThrowError('You need at least 8 players');

    // Best-of-1 Matches (4 player matches - 4th place get strikes)
    var fTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(10);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(fTooMany).toThrowError('You can have no more than 9 players');
    var fTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
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
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(24);
      tournament.setGamesPerRound(3);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(gTooMany).toThrowError('You can have no more than 23 players');

    var gTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
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
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(6);
      tournament.setGamesPerRound(5);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(hTooMany).toThrowError('You can have no more than 5 players');

    var hTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
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
      tournament.setStrikes(3);
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
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(7);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(iTooFew).toThrowError('You need at least 4 players');
  });

  it('provides meaningful games', function() {
    tournament.setStrikes(3);

    // Best-of-1 Matches (2 players with 1 strike per match)
    tournament.setPlayersPerGame(2);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(1);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(6);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(7);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(8);

    tournament.setPlayers(14);
    expect(tournament.getMeaningfulGames()).toBe(9);

    tournament.setPlayers(23);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setPlayers(31);
    expect(tournament.getMeaningfulGames()).toBe(11);

    tournament.setPlayers(57);
    expect(tournament.getMeaningfulGames()).toBe(12);

    tournament.setPlayers(87);
    expect(tournament.getMeaningfulGames()).toBe(13);

    tournament.setPlayers(128);
    expect(tournament.getMeaningfulGames()).toBe(14);

    // Best-of-1 Matches (3 player matches - 2nd/3rd place get strikes)
    tournament.setPlayersPerGame(3);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(2);

    tournament.setPlayers(9);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setPlayers(11);
    expect(tournament.getMeaningfulGames()).toBe(11);

    tournament.setPlayers(26);
    expect(tournament.getMeaningfulGames()).toBe(12);

    tournament.setPlayers(52);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(108);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(242);
    expect(tournament.getMeaningfulGames()).toBe(17);

    tournament.setPlayers(512);
    expect(tournament.getMeaningfulGames()).toBe(18);

    // Best-of-1 Matches (3 player matches - 3rd place get strikes)
    tournament.setPlayersPerGame(3);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(1);

    tournament.setPlayers(6);
    expect(tournament.getMeaningfulGames()).toBe(11);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(13);

    tournament.setPlayers(8);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(9);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(11);
    expect(tournament.getMeaningfulGames()).toBe(17);

    tournament.setPlayers(15);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(19);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(25);
    expect(tournament.getMeaningfulGames()).toBe(21);

    tournament.setPlayers(34);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(44);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(45);
    expect(tournament.getMeaningfulGames()).toBe(26);

    // Best-of-1 Matches (4 player matches - 2nd/3rd/4th place get strikes)
    tournament.setPlayersPerGame(4);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(3);

    tournament.setPlayers(9);
    expect(tournament.getMeaningfulGames()).toBe(12);

    tournament.setPlayers(30);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(84);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(254);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(512);
    expect(tournament.getMeaningfulGames()).toBe(20);

    // Best-of-1 Matches (4 player matches - 3rd/4th place get strikes)
    tournament.setPlayersPerGame(4);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(2);

    tournament.setPlayers(14);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(23);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(31);
    expect(tournament.getMeaningfulGames()).toBe(22);

    tournament.setPlayers(57);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(58);
    expect(tournament.getMeaningfulGames()).toBe(26);

    // Best-of-1 Matches (4 player matches - 4th place get strikes)
    tournament.setPlayersPerGame(4);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(1);

    tournament.setPlayers(8);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(9);
    expect(tournament.getMeaningfulGames()).toBe(25);

    // Best-of-3 Matches (2 players with 1 strike per match)
    tournament.setPlayersPerGame(2);
    tournament.setGamesPerRound(3);
    tournament.setEliminationCount(1);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(6);
    expect(tournament.getMeaningfulGames()).toBe(19);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(8);
    expect(tournament.getMeaningfulGames()).toBe(21);

    tournament.setPlayers(14);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(16);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(23);
    expect(tournament.getMeaningfulGames()).toBe(25);

    // Best-of-5 Matches (2 players with 1 strike per match)
    tournament.setPlayersPerGame(2);
    tournament.setGamesPerRound(5);
    tournament.setEliminationCount(1);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(28);

    // Best-of-7 Matches (2 players with 1 strike per match)
    tournament.setPlayersPerGame(2);
    tournament.setGamesPerRound(7);
    tournament.setEliminationCount(1);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(33);
  });

});
