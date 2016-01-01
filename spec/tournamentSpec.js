var IfpaTgpTournament = require('../src/IfpaTgpTournament');

describe('A tournament', function() {
  var tournament;

  beforeEach(function() {
    tournament = new IfpaTgpTournament();
  });

  it('can set format to best game', function() {
    tournament.setFormat('best_game');
    expect(tournament.format).toBe('best_game');
  });

  it('can set format to pingolf', function() {
    tournament.setFormat('pingolf');
    expect(tournament.format).toBe('pingolf');
  });

  it('can set format to match play', function() {
    tournament.setFormat('match_play');
    expect(tournament.format).toBe('match_play');
  });

  it('can set format to single elimination', function() {
    tournament.setFormat('single_elimination');
    expect(tournament.format).toBe('single_elimination');
  });

  it('can set format to double elimination', function() {
    tournament.setFormat('double_elimination');
    expect(tournament.format).toBe('double_elimination');
  });

  it('can set format to knockout', function() {
    tournament.setFormat('knockout');
    expect(tournament.format).toBe('knockout');
  });

  it('throws error on bad format', function() {
    var foo = function() {
      tournament.setFormat('foobar');
    };
    expect(foo).toThrowError("Unknown tournament format");
  });

  it('can set qualifying hours', function() {
    tournament.setHours(5);
    expect(tournament.hours).toBe(5);
  });

  it('can set games counted', function() {
    tournament.setGames(5);
    expect(tournament.games).toBe(5);
  });

  it('can set rounds', function() {
    tournament.setRounds(5);
    expect(tournament.rounds).toBe(5);
  });

  it('can set scores counted on each game', function() {
    tournament.setScores(5);
    expect(tournament.scores).toBe(5);
  });

  it('can set games per round', function() {
    tournament.setGamesPerRound(5);
    expect(tournament.gamesPerRound).toBe(5);
  });

  it('can set players', function() {
    tournament.setPlayers(10);
    expect(tournament.players).toBe(10);
  });

  it('can toggle head-to-head and group play', function() {
    tournament.setPlayersPerGame(2);
    expect(tournament.playersPerGame).toBe(2);

    tournament.setPlayersPerGame(3);
    expect(tournament.playersPerGame).toBe(3);

    tournament.setPlayersPerGame(4);
    expect(tournament.playersPerGame).toBe(4);
  });

  it('throws error if players per round is set to invalid value', function() {
    var bar = function() {
      tournament.setPlayersPerGame(1);
    };
    expect(bar).toThrowError('Players per game must be 2, 3 or 4');
  });

  it('provides direct status', function() {
    tournament.setFormat('best_game');
    expect(tournament.isDirect()).toBe(false);

    tournament.setFormat('pingolf');
    expect(tournament.isDirect()).toBe(false);

    tournament.setFormat('match_play');
    expect(tournament.isDirect()).toBe(true);

    tournament.setFormat('single_elimination');
    expect(tournament.isDirect()).toBe(true);

    tournament.setFormat('double_elimination');
    expect(tournament.isDirect()).toBe(true);

    tournament.setFormat('knockout');
    expect(tournament.isDirect()).toBe(true);

    tournament.setFormat('group_bracket');
    expect(tournament.isDirect()).toBe(true);
  });

  it('provides indirect status', function() {
    tournament.setFormat('best_game');
    expect(tournament.isIndirect()).toBe(true);

    tournament.setFormat('pingolf');
    expect(tournament.isIndirect()).toBe(true);

    tournament.setFormat('match_play');
    expect(tournament.isIndirect()).toBe(false);

    tournament.setFormat('single_elimination');
    expect(tournament.isIndirect()).toBe(false);

    tournament.setFormat('double_elimination');
    expect(tournament.isIndirect()).toBe(false);

    tournament.setFormat('knockout');
    expect(tournament.isIndirect()).toBe(false);

    tournament.setFormat('group_bracket');
    expect(tournament.isIndirect()).toBe(false);
  });

  it('throws error when trying to determine direct/indirect status without a format', function() {
    var direct = function() {
      tournament.isDirect();
    };
    expect(direct).toThrowError("Tournament format not set");

    var indirect = function() {
      tournament.isIndirect();
    };
    expect(indirect).toThrowError("Tournament format not set");
  });

});
