var IfpaTgpTournament = require('../src/IfpaTgpTournament');

describe('A Best Game tournament', function() {
  var tournament;

  beforeEach(function() {
    tournament = new IfpaTgpTournament();
    tournament.setFormat('best_game');
  });

  it('provides meaningful games count', function() {
    tournament.setGames(5);
    tournament.setScores(1);
    expect(tournament.getMeaningfulGames()).toBe(5);
  });

  it('provides meaningful games count limited by scores counted', function() {
    tournament.setGames(5);
    tournament.setScores(3);
    expect(tournament.getMeaningfulGames()).toBe(15);

    tournament.setGames(5);
    tournament.setScores(4);
    expect(tournament.getMeaningfulGames()).toBe(15);
  });

  it('treats not set games/scores as zero', function() {
    expect(tournament.getMeaningfulGames()).toBe(0);
  });

  it('treats not set scores as zero', function() {
    tournament.setGames(5);
    expect(tournament.getMeaningfulGames()).toBe(0);
  });

  it('treats not set games as zero', function() {
    tournament.setScores(3);
    expect(tournament.getMeaningfulGames()).toBe(0);
  });

  it('provides TGP for limited qualifying', function() {
    tournament.setGames(0);
    tournament.setScores(0);
    expect(tournament.getTGP()).toBe(0);

    tournament.setGames(1);
    tournament.setScores(1);
    expect(tournament.getTGP()).toBe(4);

    tournament.setGames(5);
    tournament.setScores(1);
    expect(tournament.getTGP()).toBe(20);

    tournament.setGames(5);
    tournament.setScores(3);
    expect(tournament.getTGP()).toBe(60);

    tournament.setGames(5);
    tournament.setScores(4);
    expect(tournament.getTGP()).toBe(60);
  });

  it('provides TGP for unlimited qualifying', function() {
    tournament.setHours(0);
    expect(tournament.getTGP()).toBe(0);

    tournament.setHours(1);
    expect(tournament.getTGP()).toBe(1);

    tournament.setHours(20);
    expect(tournament.getTGP()).toBe(20);

    tournament.setHours(21);
    expect(tournament.getTGP()).toBe(20);

    tournament.setHours(20);
    tournament.setGames(5);
    tournament.setScores(1);
    expect(tournament.getTGP()).toBe(40);
  });

  it('rounds TGP to 100%', function() {
    tournament.setGames(30);
    tournament.setScores(3);
    tournament.setHours(20);
    expect(tournament.getTGP()).toBe(100);
  });

});
