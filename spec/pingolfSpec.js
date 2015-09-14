var IfpaTgpTournament = require('../src/IfpaTgpTournament');

describe('A Pingolf tournament', function() {
  var tournament;

  beforeEach(function() {
    tournament = new IfpaTgpTournament();
    tournament.setFormat('pingolf');
  });

  it('provides meaningful games count', function() {
    tournament.setGames(5);
    expect(tournament.getMeaningfulGames()).toBe(5);
  });

  it('provides TGP for limited qualifying', function() {
    tournament.setGames(0);
    expect(tournament.getTGP()).toBe(0);

    tournament.setGames(1);
    expect(tournament.getTGP()).toBe(4);

    tournament.setGames(5);
    expect(tournament.getTGP()).toBe(20);
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
    expect(tournament.getTGP()).toBe(40);
  });

  it('rounds TGP to 100%', function() {
    tournament.setGames(30);
    tournament.setHours(20);
    expect(tournament.getTGP()).toBe(100);
  });

});
