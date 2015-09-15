var IfpaTgpTournament = (function(exports){
  var Tournament = function() {};

  Tournament.prototype.setFormat = function(format) {
    if (['best_game', 'pingolf', 'match_play', 'single_elimination', 'double_elimination', 'knockout', 'group_bracket', 'ladder'].indexOf(format) === -1) {
      throw new Error("Unknown tournament format");
    }

    this.format = format;
  };

  Tournament.prototype.isDirect = function() {
    if (!this.format) {
      throw new Error("Tournament format not set");
    }

    if (['match_play', 'single_elimination', 'double_elimination', 'knockout', 'ladder', 'group_bracket'].indexOf(this.format) !== -1) {
      return true;
    }
    return false;
  };

  Tournament.prototype.isIndirect = function() {
    if (!this.format) {
      throw new Error("Tournament format not set");
    }

    if (['best_game', 'pingolf'].indexOf(this.format) !== -1) {
      return true;
    }
    return false;
  };

  Tournament.prototype.setHours = function(hours) {
    this.hours = hours;
  };

  Tournament.prototype.setGames = function(games) {
    this.games = games;
  };

  Tournament.prototype.setRounds = function(rounds) {
    this.rounds = rounds;
  };

  Tournament.prototype.setScores = function(scores) {
    this.scores = scores;
  };

  Tournament.prototype.setGamesPerRound = function(count) {
    this.gamesPerRound = count;
  };

  Tournament.prototype.setPlayersPerGame = function(count) {
    if (count < 2 || count > 4) {
      throw new Error('Players per game must be 2, 3 or 4');
    }
    this.playersPerGame = count;
  };

  Tournament.prototype.setPlayers = function(players) {
    this.players = players;
  };

  Tournament.prototype.setStrikes = function(strikes) {
    this.strikes = strikes;
  };

  Tournament.prototype.getMeaningfulGames = function() {
    var meaningfulGames = 0;

    if (this.format === 'best_game') {
      if (this.games && this.scores) {
        meaningfulGames = this.games * (this.scores > 3 ? 3 : this.scores);
      }
    } else if (this.format === 'pingolf') {
      meaningfulGames = this.games ? this.games : 0;
    } else if (this.format === 'match_play') {
      if (this.gamesPerRound && this.rounds && this.playersPerGame) {
        meaningfulGames = (this.gamesPerRound * this.rounds);
        if (this.playersPerGame === 4) {
          meaningfulGames = meaningfulGames*2;
        }
      }
    } else if (this.format === 'knockout') {
      meaningfulGames = this.getKnockoutMeaningfulGames();
    } else if (this.format === 'ladder') {
      meaningfulGames = this.getLadderMeaningfulGames();
    } else if (this.format === 'group_bracket') {
      meaningfulGames = this.getGroupBracketMeaningfulGames();
    } else if (this.format === 'single_elimination') {
      meaningfulGames = this.getSingleEliminationMeaningfulGames();
    }

    return meaningfulGames;
  };

  Tournament.prototype.getTGP = function() {
    var tgp = 0;

    if ((this.format === 'best_game' || this.format === 'pingolf') && this.hours) {
      tgp = this.getMeaningfulGames()*4 + (this.hours > 20 ? 20 : this.hours);
    } else {
      tgp = this.getMeaningfulGames()*4;
    }

    return tgp > 100 ? 100 : tgp;
  };

  Tournament.prototype.getSingleEliminationMeaningfulGames = function() {
    if (!this.players || !this.gamesPerRound) {
      return 0;
    }

    if ([1, 3, 5, 7].indexOf(this.gamesPerRound) === -1) {
      throw new Error('Can only calculate single elimination tournaments that are Best Of 1, 3, 5 or 7 games');
    }

    // Throw error when player count is out of bounds
    // bounds[gamesPerRound]
    var bounds = {
      1: [4, 367],
      3: [4, 367],
      5: [4, 183],
      7: [4, 45]
    };

    if (this.players < bounds[this.gamesPerRound][0] || this.players > bounds[this.gamesPerRound][1]) {
      throw new Error('You have too many or too few players players');
    }

    if (this.gamesPerRound === 1) {
      if (this.players <= 5) {
        return 2;
      } else if (this.players <= 11) {
        return 3;
      } else if (this.players <= 22) {
        return 4;
      } else if (this.players <= 45) {
        return 5;
      } else if (this.players <= 91) {
        return 6;
      } else if (this.players <= 183) {
        return 7;
      } else if (this.players <= 367) {
        return 8;
      }
    } else if (this.gamesPerRound === 3) {
      if (this.players <= 5) {
        return 5;
      } else if (this.players <= 11) {
        return 8;
      } else if (this.players <= 22) {
        return 10;
      } else if (this.players <= 45) {
        return 13;
      } else if (this.players <= 91) {
        return 15;
      } else if (this.players <= 183) {
        return 18;
      } else if (this.players <= 367) {
        return 20;
      }
    } else if (this.gamesPerRound === 5) {
      if (this.players <= 5) {
        return 8;
      } else if (this.players <= 11) {
        return 12;
      } else if (this.players <= 22) {
        return 16;
      } else if (this.players <= 45) {
        return 20;
      } else if (this.players <= 91) {
        return 24;
      } else if (this.players <= 183) {
        return 28;
      }
    } else if (this.gamesPerRound === 7) {
      if (this.players <= 5) {
        return 11;
      } else if (this.players <= 11) {
        return 17;
      } else if (this.players <= 22) {
        return 22;
      } else if (this.players <= 45) {
        return 28;
      }
    }

  };

  Tournament.prototype.getGroupBracketMeaningfulGames = function() {
    if (!this.players || !this.gamesPerRound) {
      return 0;
    }

    if (this.gamesPerRound !== 3 && this.gamesPerRound !== 4) {
      throw new Error('Can only calculate group bracket tournaments with 3 or 4 games per round');
    }

    // Throw error when player count is out of bounds
    // bounds[gamesPerRound]
    var bounds = {
      3: [4, 91],
      4: [4, 45]
    };

    if (this.players < bounds[this.gamesPerRound][0] || this.players > bounds[this.gamesPerRound][1]) {
      throw new Error('You have too many or too few players players');
    }

    if (this.gamesPerRound === 3) {
      if (this.players <= 5) {
        return 6;
      } else if (this.players <= 11) {
        return 12;
      } else if (this.players <= 22) {
        return 18;
      } else if (this.players <= 45) {
        return 24;
      } else if (this.players <= 91) {
        return 30;
      }
    } else if (this.gamesPerRound === 4) {
      if (this.players <= 5) {
        return 8;
      } else if (this.players <= 11) {
        return 16;
      } else if (this.players <= 22) {
        return 24;
      } else if (this.players <= 45) {
        return 32;
      }
    }
  };

  Tournament.prototype.getLadderMeaningfulGames = function() {
    if (!this.players || !this.playersPerGame) {
      return 0;
    }

    if (this.playersPerGame === 2) {
      throw new Error('Ladder tournaments cannot be head-to-head');
    }

    // Throw error when player count is out of bounds
    // bounds[playersPerGame]
    var bounds = {
      3: [4, 453],
      4: [4, 271]
    };

    if (this.players < bounds[this.playersPerGame][0] || this.players > bounds[this.playersPerGame][1]) {
      throw new Error('You have too many or too few players players');
    }

    if (this.playersPerGame === 4) {
      if (this.players <= 4) {
        return 2;
      } else if (this.players <= 5) {
        return 3;
      } else if (this.players <= 6) {
        return 5;
      } else if (this.players <= 12) {
        return 6;
      } else if (this.players <= 44) {
        return 7;
      } else if (this.players <= 271) {
        return 8;
      }
    } else if (this.playersPerGame === 3) {
      if (this.players <= 10) {
        return 2;
      } else if (this.players <= 453) {
        return 3;
      }
    }


  };

  Tournament.prototype.getKnockoutMeaningfulGames = function() {
    if (!this.players || !this.gamesPerRound || !this.strikes || !this.playersPerGame) {
      return 0;
    }

    if (this.playersPerGame > 3) {
      throw new Error('Can only calculate TGP for knockout tournaments with head-to-head or three-player groups');
    }

    if (this.playersPerGame > 2 && this.gamesPerRound > 1) {
      throw new Error('Best-of-X is only supported for head-to-head tournaments');
    }

    // Throw error when player count is out of bounds
    // bounds[strikes][playersPerGame][gamesPerRound]
    var bounds = {
      2: {
        2: {
          1: [2, 255],
          3: [2, 127],
          5: [2, 14],
          7: [2, 7]
        },
        3: {
          1: [6, 512]
        }
      },
      3: {
        2: {
          1: [4, 254],
          3: [4, 31],
          5: [4, 5],
          7: [4, 5]
        },
        3: {
          1: [6, 512]
        }
      },
      4: {
        2: {
          1: [4, 452],
          3: [4, 14],
          5: [4, 5],
          7: [4, 5]
        },
        3: {
          1: [6, 512]
        }
      }
    };

    if (this.players < bounds[this.strikes][this.playersPerGame][this.gamesPerRound][0] || this.players > bounds[this.strikes][this.playersPerGame][this.gamesPerRound][1]) {
      throw new Error('You have too many or too few players players');
    }

    if (this.strikes === 2) {
      if (this.playersPerGame === 2) {
        if (this.gamesPerRound === 1) {
          if (this.players <= 4) {
            return 5;
          } else if (this.players <= 7) {
            return 6;
          } else if (this.players <= 14) {
            return 7;
          } else if (this.players <= 23) {
            return 8;
          } else if (this.players <= 39) {
            return 9;
          } else if (this.players <= 63) {
            return 10;
          } else if (this.players <= 127) {
            return 11;
          } else if (this.players <= 255) {
            return 12;
          }
        } else if (this.gamesPerRound === 3) {
          if (this.players <= 4) {
            return 13;
          } else if (this.players <= 7) {
            return 15;
          } else if (this.players <= 14) {
            return 18;
          } else if (this.players <= 23) {
            return 20;
          } else if (this.players <= 39) {
            return 23;
          } else if (this.players <= 63) {
            return 25;
          } else if (this.players <= 127) {
            return 28;
          }
        } else if (this.gamesPerRound === 5) {
          if (this.players <= 4) {
            return 20;
          } else if (this.players <= 7) {
            return 24;
          } else if (this.players <= 14) {
            return 28;
          }
        } else if (this.gamesPerRound === 7) {
          if (this.players <= 4) {
            return 28;
          } else if (this.players <= 7) {
            return 33;
          }
        }
      } else if (this.playersPerGame === 3 && this.gamesPerRound === 1) {
        if (this.players <= 9) {
          return 4;
        } else if (this.players <= 12) {
          return 5;
        } else if (this.players <= 27) {
          return 6;
        } else if (this.players <= 80) {
          return 7;
        } else if (this.players <= 216) {
          return 8;
        } else if (this.players <= 512) {
          return 9;
        }
      }
    } else if (this.strikes === 3) {
      if (this.playersPerGame === 2) {
        if (this.gamesPerRound === 1) {
          if (this.players <= 4) {
            return 6;
          } else if (this.players <= 5) {
            return 7;
          } else if (this.players <= 7) {
            return 8;
          } else if (this.players <= 14) {
            return 9;
          } else if (this.players <= 23) {
            return 10;
          } else if (this.players <= 31) {
            return 11;
          } else if (this.players <= 57) {
            return 12;
          } else if (this.players <= 87) {
            return 13;
          } else if (this.players <= 143) {
            return 14;
          } else if (this.players <= 254) {
            return 15;
          }
        } else if (this.gamesPerRound === 3) {
          if (this.players <= 4) {
            return 15;
          } else if (this.players <= 5) {
            return 18;
          } else if (this.players <= 7) {
            return 20;
          } else if (this.players <= 14) {
            return 23;
          } else if (this.players <= 23) {
            return 25;
          } else if (this.players <= 31) {
            return 28;
          }
        } else if (this.gamesPerRound === 5) {
          if (this.players <= 4) {
            return 24;
          } else if (this.players <= 5) {
            return 28;
          }
        } else if (this.gamesPerRound === 7) {
          if (this.players <= 4) {
            return 33;
          } else if (this.players <= 5) {
            return 39;
          }
        }
      } else if (this.playersPerGame === 3 && this.gamesPerRound === 1) {
        if (this.players <= 11) {
          return 7;
        } else if (this.players <= 26) {
          return 8;
        } else if (this.players <= 52) {
          return 9;
        } else if (this.players <= 108) {
          return 10;
        } else if (this.players <= 242) {
          return 11;
        } else if (this.players <= 512) {
          return 12;
        }
      }
    } else if (this.strikes === 4) {
      if (this.playersPerGame === 2) {
        if (this.gamesPerRound === 1) {
          if (this.players <= 4) {
            return 7;
          } else if (this.players <= 5) {
            return 8;
          } else if (this.players <= 6) {
            return 9;
          } else if (this.players <= 8) {
            return 10;
          } else if (this.players <= 14) {
            return 11;
          } else if (this.players <= 23) {
            return 12;
          } else if (this.players <= 31) {
            return 13;
          } else if (this.players <= 46) {
            return 14;
          } else if (this.players <= 71) {
            return 15;
          } else if (this.players <= 119) {
            return 16;
          } else if (this.players <= 190) {
            return 17;
          } else if (this.players <= 292) {
            return 18;
          } else if (this.players <= 452) {
            return 19;
          }
        } else if (this.gamesPerRound === 3) {
          if (this.players <= 4) {
            return 18;
          } else if (this.players <= 5) {
            return 20;
          } else if (this.players <= 6) {
            return 23;
          } else if (this.players <= 8) {
            return 25;
          } else if (this.players <= 14) {
            return 28;
          }
        } else if (this.gamesPerRound === 5) {
          if (this.players <= 4) {
            return 28;
          } else if (this.players <= 5) {
            return 32;
          }
        } else if (this.gamesPerRound === 7) {
          if (this.players <= 4) {
            return 39;
          } else if (this.players <= 5) {
            return 44;
          }
        }
      } else if (this.playersPerGame === 3 && this.gamesPerRound === 1) {
        if (this.players <= 8) {
          return 8;
        } else if (this.players <= 17) {
          return 9;
        } else if (this.players <= 26) {
          return 10;
        } else if (this.players <= 66) {
          return 11;
        } else if (this.players <= 134) {
          return 12;
        } else if (this.players <= 261) {
          return 13;
        } else if (this.players <= 512) {
          return 14;
        }
      }
    }

  };

  return Tournament;
}());

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = IfpaTgpTournament;
}
