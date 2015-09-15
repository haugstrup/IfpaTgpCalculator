var IfpaTgpTournament = require('../src/IfpaTgpTournament');

describe('A Single Elimination tournament', function() {
  var tournament;

  beforeEach(function() {
    tournament = new IfpaTgpTournament();
    tournament.setFormat('single_elimination');
  });

  it('provides meaningful games with not all settings set', function() {
    expect(tournament.getMeaningfulGames()).toBe(0);

    tournament.setGamesPerRound(3);
    expect(tournament.getMeaningfulGames()).toBe(0);
  });

  it('throws error when games per round is not 1, 3, 5 or 7', function() {
    var foo = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('single_elimination');
      tournament.setPlayers(16);
      tournament.setGamesPerRound(4);
      tournament.getMeaningfulGames();
    };
    expect(foo).toThrowError('Can only calculate single elimination tournaments that are Best Of 1, 3, 5 or 7 games');
  });

  it('throws error if player count is out of bounds', function() {
    // Best of 1
    var firstTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('single_elimination');
      tournament.setPlayers(368);
      tournament.setGamesPerRound(1);
      tournament.getMeaningfulGames();
    };
    expect(firstTooMany).toThrowError('You have too many or too few players players');

    var firstTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('single_elimination');
      tournament.setPlayers(3);
      tournament.setGamesPerRound(1);
      tournament.getMeaningfulGames();
    };
    expect(firstTooFew).toThrowError('You have too many or too few players players');

    // Best of 3
    var secondTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('single_elimination');
      tournament.setPlayers(368);
      tournament.setGamesPerRound(3);
      tournament.getMeaningfulGames();
    };
    expect(secondTooMany).toThrowError('You have too many or too few players players');

    var secondTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('single_elimination');
      tournament.setPlayers(3);
      tournament.setGamesPerRound(3);
      tournament.getMeaningfulGames();
    };
    expect(secondTooFew).toThrowError('You have too many or too few players players');

    // Best of 5
    var thirdTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('single_elimination');
      tournament.setPlayers(184);
      tournament.setGamesPerRound(5);
      tournament.getMeaningfulGames();
    };
    expect(thirdTooMany).toThrowError('You have too many or too few players players');

    var thirdTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('single_elimination');
      tournament.setPlayers(3);
      tournament.setGamesPerRound(5);
      tournament.getMeaningfulGames();
    };
    expect(thirdTooFew).toThrowError('You have too many or too few players players');

    // Best of 7
    var fourthTooMany = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('single_elimination');
      tournament.setPlayers(46);
      tournament.setGamesPerRound(7);
      tournament.getMeaningfulGames();
    };
    expect(fourthTooMany).toThrowError('You have too many or too few players players');

    var fourthTooFew = function() {
      tournament = new IfpaTgpTournament();
      tournament.setFormat('single_elimination');
      tournament.setPlayers(3);
      tournament.setGamesPerRound(7);
      tournament.getMeaningfulGames();
    };
    expect(fourthTooFew).toThrowError('You have too many or too few players players');
  });

  it('provides meaningful games for best of 1', function() {
    tournament.setGamesPerRound(1);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(2);

    tournament.setPlayers(11);
    expect(tournament.getMeaningfulGames()).toBe(3);

    tournament.setPlayers(22);
    expect(tournament.getMeaningfulGames()).toBe(4);

    tournament.setPlayers(45);
    expect(tournament.getMeaningfulGames()).toBe(5);

    tournament.setPlayers(91);
    expect(tournament.getMeaningfulGames()).toBe(6);

    tournament.setPlayers(183);
    expect(tournament.getMeaningfulGames()).toBe(7);

    tournament.setPlayers(367);
    expect(tournament.getMeaningfulGames()).toBe(8);
  });

  it('provides meaningful games for best of 3', function() {
    tournament.setGamesPerRound(3);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(5);

    tournament.setPlayers(11);
    expect(tournament.getMeaningfulGames()).toBe(8);

    tournament.setPlayers(22);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setPlayers(45);
    expect(tournament.getMeaningfulGames()).toBe(13);

    tournament.setPlayers(91);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setPlayers(183);
    expect(tournament.getMeaningfulGames()).toBe(18);

    tournament.setPlayers(367);
    expect(tournament.getMeaningfulGames()).toBe(20);
  });

  it('provides meaningful games for best of 5', function() {
    tournament.setGamesPerRound(5);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(8);

    tournament.setPlayers(11);
    expect(tournament.getMeaningfulGames()).toBe(12);

    tournament.setPlayers(22);
    expect(tournament.getMeaningfulGames()).toBe(16);

    tournament.setPlayers(45);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setPlayers(91);
    expect(tournament.getMeaningfulGames()).toBe(24);

    tournament.setPlayers(183);
    expect(tournament.getMeaningfulGames()).toBe(28);
  });

  it('provides meaningful games for best of 7', function() {
    tournament.setGamesPerRound(7);

    tournament.setPlayers(5);
    expect(tournament.getMeaningfulGames()).toBe(11);

    tournament.setPlayers(11);
    expect(tournament.getMeaningfulGames()).toBe(17);

    tournament.setPlayers(22);
    expect(tournament.getMeaningfulGames()).toBe(22);

    tournament.setPlayers(45);
    expect(tournament.getMeaningfulGames()).toBe(28);
  });

});
