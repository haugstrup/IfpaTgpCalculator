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
    var firstTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(255);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(firstTooMany).toThrowError('You have too many or too few players players');

    var firstTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(firstTooFew).toThrowError('You have too many or too few players players');

    // Best-of-1 Matches (3 player matches - 2nd/3rd place get strikes)
    var secondTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(513);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(secondTooMany).toThrowError('You have too many or too few players players');
    var secondTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(3);
      tournament.setPlayers(5);
      tournament.setGamesPerRound(1);
      tournament.setEliminationCount(2);
      tournament.getMeaningfulGames();
    };
    expect(secondTooFew).toThrowError('You have too many or too few players players');

    // Best-of-3 Matches (2 players with 1 strike per match)
    var thirdTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(32);
      tournament.setGamesPerRound(3);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(thirdTooMany).toThrowError('You have too many or too few players players');

    var thirdTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(3);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(thirdTooFew).toThrowError('You have too many or too few players players');

    // Best-of-5 Matches (2 players with 1 strike per match)
    var fourthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(6);
      tournament.setGamesPerRound(5);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(fourthTooMany).toThrowError('You have too many or too few players players');

    var fourthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(5);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(fourthTooFew).toThrowError('You have too many or too few players players');

    // Best-of-7 Matches (2 players with 1 strike per match)
    var fifthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(6);
      tournament.setGamesPerRound(7);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(fifthTooMany).toThrowError('You have too many or too few players players');

    var fifthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('knockout');
      tournament.setStrikes(3);
      tournament.setPlayersPerGame(2);
      tournament.setPlayers(3);
      tournament.setGamesPerRound(7);
      tournament.setEliminationCount(1);
      tournament.getMeaningfulGames();
    };
    expect(fifthTooFew).toThrowError('You have too many or too few players players');
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

    tournament.setPlayers(143);
    expect(tournament.getMeaningfulGames()).toBe(14);

    tournament.setPlayers(254);
    expect(tournament.getMeaningfulGames()).toBe(15);

    // Best-of-1 Matches (3 player matches - 2nd/3rd place get strikes)
    tournament.setPlayersPerGame(3);
    tournament.setGamesPerRound(1);
    tournament.setEliminationCount(2);

    tournament.setPlayers(11);
    expect(tournament.getMeaningfulGames()).toBe(7);

    tournament.setPlayers(26);
    expect(tournament.getMeaningfulGames()).toBe(8);

    tournament.setPlayers(52);
    expect(tournament.getMeaningfulGames()).toBe(9);

    tournament.setPlayers(108);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setPlayers(242);
    expect(tournament.getMeaningfulGames()).toBe(11);

    tournament.setPlayers(512);
    expect(tournament.getMeaningfulGames()).toBe(12);

    // Best-of-3 Matches (2 players with 1 strike per match)
    tournament.setPlayersPerGame(2);
    tournament.setGamesPerRound(3);
    tournament.setEliminationCount(1);

    tournament.setPlayers(4);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(7);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(14);
    expect(tournament.getMeaningfulGames()).toBe(23);

    tournament.setPlayers(23);
    expect(tournament.getMeaningfulGames()).toBe(25);

    tournament.setPlayers(31);
    expect(tournament.getMeaningfulGames()).toBe(28);

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

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(39);
  });

});
