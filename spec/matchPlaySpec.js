var IfpaTgpTournament = require('../src/IfpaTgpTournament');

describe('A Match Play tournament', function() {
  var tournament;

  beforeEach(function() {
    tournament = new IfpaTgpTournament();
    tournament.setFormat('match_play');
  });

  it('provides meaningful games with not all settings set', function() {
    expect(tournament.getMeaningfulGames()).toBe(0);

    tournament.setPlayersPerGame(2);
    expect(tournament.getMeaningfulGames()).toBe(0);

    tournament.setRounds(1);
    expect(tournament.getMeaningfulGames()).toBe(0);
  });

  it('provides meaningful games for head-to-head', function() {
    tournament.setPlayersPerGame(2);
    tournament.setRounds(5);
    tournament.setGamesPerRound(1);
    expect(tournament.getMeaningfulGames()).toBe(5);

    tournament.setRounds(5);
    tournament.setGamesPerRound(2);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setRounds(10);
    tournament.setGamesPerRound(1);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setRounds(10);
    tournament.setGamesPerRound(5);
    expect(tournament.getMeaningfulGames()).toBe(50);
  });

  it('provides meaningful games for three-player groups', function() {
    tournament.setPlayersPerGame(3);
    tournament.setRounds(5);
    tournament.setGamesPerRound(1);
    expect(tournament.getMeaningfulGames()).toBe(5);

    tournament.setRounds(5);
    tournament.setGamesPerRound(2);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setRounds(10);
    tournament.setGamesPerRound(1);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setRounds(10);
    tournament.setGamesPerRound(5);
    expect(tournament.getMeaningfulGames()).toBe(50);
  });

  it('provides meaningful games for four-player groups', function() {
    tournament.setPlayersPerGame(4);
    tournament.setRounds(5);
    tournament.setGamesPerRound(1);
    expect(tournament.getMeaningfulGames()).toBe(10);

    tournament.setRounds(5);
    tournament.setGamesPerRound(2);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setRounds(10);
    tournament.setGamesPerRound(1);
    expect(tournament.getMeaningfulGames()).toBe(20);

    tournament.setRounds(10);
    tournament.setGamesPerRound(5);
    expect(tournament.getMeaningfulGames()).toBe(100);
  });

  it('provides TGP', function() {
    tournament.setFormat('match_play');
    tournament.setGamesPerRound(1);
    tournament.setPlayersPerGame(2);
    tournament.setRounds(20);
    expect(tournament.getTGP()).toBe(80);

    tournament.setFormat('match_play');
    tournament.setGamesPerRound(3);
    tournament.setPlayersPerGame(4);
    tournament.setRounds(3);
    expect(tournament.getTGP()).toBe(72);
  });

  it('rounds TGP to 100%', function() {
    tournament.setPlayersPerGame(4);
    tournament.setGamesPerRound(3);
    tournament.setRounds(100);
    expect(tournament.getTGP()).toBe(100);
  });

});
