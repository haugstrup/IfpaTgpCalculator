var IfpaTgpTournament = require('../src/IfpaTgpTournament');

describe('A Four-Strikes Knockout tournament', function() {
  var tournament;

  beforeEach(function() {
    tournament = new IfpaTgpTournament();
    tournament.setFormat('knockout');
    tournament.setStrikes(4);
    tournament.setEliminationCount(1);
  });

  it('throws error on best-of-X and more than two players', function() {
    // Best-of-1 Matches (2 players with 1 strike per match)
    var foo = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
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
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(120);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(aTooMany).toThrowError('You have too many or too few players players');

    var aTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(aTooFew).toThrowError('You have too many or too few players players');

    // Best-of-1 Matches (3 player matches - 2nd/3rd place get strikes)
    var bTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(513);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(bTooMany).toThrowError('You have too many or too few players players');
    var bTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(5);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(bTooFew).toThrowError('You have too many or too few players players');

    // Best-of-1 Matches (3 player matches - 3rd place get strikes)
    var cTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(25);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(cTooMany).toThrowError('You have too many or too few players players');
    var cTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(5);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(cTooFew).toThrowError('You have too many or too few players players');

    // Best-of-1 Matches (4 player matches - 2nd/3rd/4th place get strikes)
    var dTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(513);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(3);
      tournament.getMeaningfulGames();
    };
    expect(dTooMany).toThrowError('You have too many or too few players players');
    var dTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(7);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(3);
      tournament.getMeaningfulGames();
    };
    expect(dTooFew).toThrowError('You have too many or too few players players');

    // Best-of-1 Matches (4 player matches - 3rd/4th place get strikes)
    var eTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(25);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(eTooMany).toThrowError('You have too many or too few players players');
    var eTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(7);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(eTooFew).toThrowError('You have too many or too few players players');

    // Best-of-1 Matches (4 player matches - 4th place get strikes)
    var fTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(9);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(fTooMany).toThrowError('You have too many or too few players players');
    var fTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(4);
      tournament.setPlayers(7);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(fTooFew).toThrowError('You have too many or too few players players');

    // Best-of-3 Matches (2 players with 1 strike per match)
    var gTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(9);
      tournament.setGamesPerRound(3);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(gTooMany).toThrowError('You have too many or too few players players');

    var gTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(3);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(gTooFew).toThrowError('You have too many or too few players players');

    // Best-of-5 Matches (2 players with 1 strike per match)
    var hTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(5);
      tournament.setGamesPerRound(5);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(hTooMany).toThrowError('You have too many or too few players players');

    var hTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(5);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(hTooFew).toThrowError('You have too many or too few players players');

    // Best-of-7 Matches (2 players with 1 strike per match)
    var iTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(5);
      tournament.setGamesPerRound(7);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(iTooMany).toThrowError('You have too many or too few players players');

    var iTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(4);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(7);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(iTooFew).toThrowError('You have too many or too few players players');
  });

  it('provides meaningful games', function() {
    tournament.setStrikes(4);

    // Best-of-1 Matches (2 players with 1 strike per match)
    tournament.setPlayersPerGame(2);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(1);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(7);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(8);

    tournament.setPlayers(6);
    expect(tournament.getMeaningfulGames()).toBe(9);

    tournament.setPlayers(8);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setPlayers(14);
    expect(tournament.getMeaningfulGames()).toBe(11);

    tournament.setPlayers(23);
    expect(tournament.getMeaningfulGames()).toBe(12);

    tournament.setPlayers(31);
    expect(tournament.getMeaningfulGames()).toBe(13);

    tournament.setPlayers(46);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(71);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(119);
    expect(tournament.getMeaningfulGames()).toBe(16);

    // Best-of-1 Matches (3 player matches - 2nd/3rd place get strikes)
    tournament.setPlayersPerGame(3);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(2);

    tournament.setPlayers(8);
    expect(tournament.getMeaningfulGames()).toBe(12);

    tournament.setPlayers(17);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(26);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(66);
    expect(tournament.getMeaningfulGames()).toBe(17);

    tournament.setPlayers(134);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(261);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(512);
    expect(tournament.getMeaningfulGames()).toBe(21);

    // Best-of-1 Matches (3 player matches - 3rd place get strikes)
    tournament.setPlayersPerGame(3);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(1);

    tournament.setPlayers(6);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(8);
    expect(tournament.getMeaningfulGames()).toBe(17);

    tournament.setPlayers(9);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(10);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(11);
    expect(tournament.getMeaningfulGames()).toBe(21);

    tournament.setPlayers(17);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(23);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(24);
    expect(tournament.getMeaningfulGames()).toBe(26);

    // Best-of-1 Matches (4 player matches - 2nd/3rd/4th place get strikes)
    tournament.setPlayersPerGame(4);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(3);

    tournament.setPlayers(18);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(52);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(132);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(340);
    expect(tournament.getMeaningfulGames()).toBe(22);

    tournament.setPlayers(512);
    expect(tournament.getMeaningfulGames()).toBe(24);

    // Best-of-1 Matches (4 player matches - 3rd/4th place get strikes)
    tournament.setPlayersPerGame(4);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(2);

    tournament.setPlayers(14);
    expect(tournament.getMeaningfulGames()).toBe(22);

    tournament.setPlayers(23);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(24);
    expect(tournament.getMeaningfulGames()).toBe(26);

    // Best-of-1 Matches (4 player matches - 4th place get strikes)
    tournament.setPlayersPerGame(4);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(1);

    tournament.setPlayers(8);
    expect(tournament.getMeaningfulGames()).toBe(25);

    // Best-of-3 Matches (2 players with 1 strike per match)
    tournament.setPlayersPerGame(2);
    tournament.setGamesPerRound(3);
    tournament.setEliminationCount(1);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(6);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(8);
    expect(tournament.getMeaningfulGames()).toBe(25);

    // Best-of-5 Matches (2 players with 1 strike per match)
    tournament.setPlayersPerGame(2);
    tournament.setGamesPerRound(5);
    tournament.setEliminationCount(1);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(28);

    // Best-of-7 Matches (2 players with 1 strike per match)
    tournament.setPlayersPerGame(2);
    tournament.setGamesPerRound(7);
    tournament.setEliminationCount(1);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(39);
  });

});
