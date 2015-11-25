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

  Tournament.prototype.setEliminationCount = function(count) {
    this.eliminated = count;
  };

  Tournament.prototype.setDoubleEliminationGamesPerRound = function(doubleEliminationGamesPerRound) {
    this.doubleEliminationGamesPerRound = doubleEliminationGamesPerRound;
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
    } else if (this.format === 'double_elimination') {
      meaningfulGames = this.getDoubleEliminationMeaningfulGames();
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

  Tournament.prototype.getDoubleEliminationMeaningfulGames = function() {
    if (!this.players || !this.doubleEliminationGamesPerRound) {
      return 0;
    }

    // Throw error when player count is out of bounds
    // bounds[doubleEliminationGamesPerRound]
    var bounds = {
      '1:1': [4, 511],
      '3:1': [4, 608],
      '3:3': [4, 207],
      '5:1': [4, 724],
      '5:3': [4, 73],
      '5:5': [4, 14],
      '7:1': [4, 430],
      '7:3': [4, 23],
      '7:5': [4, 7],
      '7:7': [4, 4]
    };

    if (this.players < bounds[this.doubleEliminationGamesPerRound][0] || this.players > bounds[this.doubleEliminationGamesPerRound][1]) {
      throw new Error('You have too many or too few players players');
    }

    if (this.doubleEliminationGamesPerRound === '1:1') {
      if (this.players <= 7) {
        return 5;
      } else if (this.players <= 15) {
        return 6;
      } else if (this.players <= 31) {
        return 7;
      } else if (this.players <= 63) {
        return 8;
      } else if (this.players <= 127) {
        return 9;
      } else if (this.players <= 255) {
        return 10;
      } else if (this.players <= 511) {
        return 11;
      }
    } else if (this.doubleEliminationGamesPerRound === '3:1') {
      if (this.players <= 4) {
        return 8;
      } else if (this.players <= 9) {
        return 9;
      } else if (this.players <= 19) {
        return 10;
      } else if (this.players <= 38) {
        return 11;
      } else if (this.players <= 76) {
        return 12;
      } else if (this.players <= 152) {
        return 13;
      } else if (this.players <= 304) {
        return 14;
      } else if (this.players <= 608) {
        return 15;
      }
    } else if (this.doubleEliminationGamesPerRound === '3:3') {
      if (this.players <= 4) {
        return 11;
      } else if (this.players <= 5) {
        return 12;
      } else if (this.players <= 7) {
        return 13;
      } else if (this.players <= 9) {
        return 14;
      } else if (this.players <= 12) {
        return 15;
      } else if (this.players <= 17) {
        return 16;
      } else if (this.players <= 22) {
        return 17;
      } else if (this.players <= 29) {
        return 18;
      } else if (this.players <= 39) {
        return 19;
      } else if (this.players <= 51) {
        return 20;
      } else if (this.players <= 68) {
        return 21;
      } else if (this.players <= 90) {
        return 22;
      } else if (this.players <= 119) {
        return 23;
      } else if (this.players <= 157) {
        return 24;
      } else if (this.players <= 207) {
        return 25;
      }
    } else if (this.doubleEliminationGamesPerRound === '5:1') {
      if (this.players <= 5) {
        return 12;
      } else if (this.players <= 11) {
        return 13;
      } else if (this.players <= 22) {
        return 14;
      } else if (this.players <= 45) {
        return 15;
      } else if (this.players <= 90) {
        return 16;
      } else if (this.players <= 181) {
        return 17;
      } else if (this.players <= 362) {
        return 18;
      } else if (this.players <= 724) {
        return 19;
      }
    } else if (this.doubleEliminationGamesPerRound === '5:3') {
      if (this.players <= 4) {
        return 15;
      } else if (this.players <= 6) {
        return 16;
      } else if (this.players <= 7) {
        return 17;
      } else if (this.players <= 10) {
        return 18;
      } else if (this.players <= 13) {
        return 19;
      } else if (this.players <= 18) {
        return 20;
      } else if (this.players <= 24) {
        return 21;
      } else if (this.players <= 31) {
        return 22;
      } else if (this.players <= 42) {
        return 23;
      } else if (this.players <= 55) {
        return 24;
      } else if (this.players <= 73) {
        return 25;
      }
    } else if (this.doubleEliminationGamesPerRound === '5:5') {
      if (this.players <= 4) {
        return 18;
      } else if (this.players <= 5) {
        return 19;
      } else if (this.players <= 6) {
        return 20;
      } else if (this.players <= 7) {
        return 21;
      } else if (this.players <= 8) {
        return 22;
      } else if (this.players <= 10) {
        return 23;
      } else if (this.players <= 12) {
        return 24;
      } else if (this.players <= 14) {
        return 25;
      }
    } else if (this.doubleEliminationGamesPerRound === '7:1') {
      if (this.players <= 6) {
        return 16;
      } else if (this.players <= 13) {
        return 17;
      } else if (this.players <= 26) {
        return 18;
      } else if (this.players <= 53) {
        return 19;
      } else if (this.players <= 107) {
        return 20;
      } else if (this.players <= 215) {
        return 21;
      } else if (this.players <= 430) {
        return 22;
      }
    } else if (this.doubleEliminationGamesPerRound === '7:3') {
      if (this.players <= 4) {
        return 19;
      } else if (this.players <= 6) {
        return 20;
      } else if (this.players <= 8) {
        return 21;
      } else if (this.players <= 11) {
        return 22;
      } else if (this.players <= 14) {
        return 23;
      } else if (this.players <= 19) {
        return 24;
      } else if (this.players <= 23) {
        return 25;
      }
    } else if (this.doubleEliminationGamesPerRound === '7:5') {
      if (this.players <= 4) {
        return 22;
      } else if (this.players <= 5) {
        return 23;
      } else if (this.players <= 6) {
        return 24;
      } else if (this.players <= 7) {
        return 25;
      }
    } else if (this.doubleEliminationGamesPerRound === '7:7') {
      if (this.players === 4) {
        return 25;
      }
    }
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
      1: [4, 350],
      3: [4, 294],
      5: [4, 82],
      7: [4, 24]
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
      } else if (this.players <= 189) {
        return 7;
      } else if (this.players <= 350) {
        return 8;
      }
    } else if (this.gamesPerRound === 3) {
      if (this.players <= 4) {
        return 5;
      } else if (this.players <= 6) {
        return 6;
      } else if (this.players <= 7) {
        return 7;
      } else if (this.players <= 10) {
        return 8;
      } else if (this.players <= 13) {
        return 9;
      } else if (this.players <= 18) {
        return 10;
      } else if (this.players <= 24) {
        return 11;
      } else if (this.players <= 31) {
        return 12;
      } else if (this.players <= 42) {
        return 13;
      } else if (this.players <= 55) {
        return 14;
      } else if (this.players <= 73) {
        return 15;
      } else if (this.players <= 97) {
        return 16;
      } else if (this.players <= 127) {
        return 17;
      } else if (this.players <= 168) {
        return 18;
      } else if (this.players <= 222) {
        return 19;
      } else if (this.players <= 294) {
        return 20;
      }
    } else if (this.gamesPerRound === 5) {
      if (this.players <= 4) {
        return 8;
      } else if (this.players <= 5) {
        return 9;
      } else if (this.players <= 6) {
        return 10;
      } else if (this.players <= 7) {
        return 11;
      } else if (this.players <= 8) {
        return 12;
      } else if (this.players <= 10) {
        return 13;
      } else if (this.players <= 12) {
        return 14;
      } else if (this.players <= 14) {
        return 15;
      } else if (this.players <= 17) {
        return 16;
      } else if (this.players <= 20) {
        return 17;
      } else if (this.players <= 24) {
        return 18;
      } else if (this.players <= 29) {
        return 19;
      } else if (this.players <= 34) {
        return 20;
      } else if (this.players <= 41) {
        return 21;
      } else if (this.players <= 49) {
        return 22;
      } else if (this.players <= 58) {
        return 23;
      } else if (this.players <= 69) {
        return 24;
      } else if (this.players <= 82) {
        return 25;
      }
    } else if (this.gamesPerRound === 7) {
      if (this.players <= 4) {
        return 11;
      } else if (this.players <= 5) {
        return 13;
      } else if (this.players <= 6) {
        return 14;
      } else if (this.players <= 7) {
        return 15;
      } else if (this.players <= 9) {
        return 17;
      } else if (this.players <= 10) {
        return 18;
      } else if (this.players <= 11) {
        return 19;
      } else if (this.players <= 13) {
        return 20;
      } else if (this.players <= 15) {
        return 21;
      } else if (this.players <= 17) {
        return 22;
      } else if (this.players <= 19) {
        return 23;
      } else if (this.players <= 21) {
        return 24;
      } else if (this.players <= 24) {
        return 25;
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

    if (this.playersPerGame > 2 && this.gamesPerRound > 1) {
      throw new Error('Best-of-X is only supported for head-to-head tournaments');
    }

    if (this.eliminated >= this.playersPerGame) {
      throw new Error('You cannot give all players a strike');
    }

    // Throw error when player count is out of bounds
    // bounds[strikes][playersPerGame][gamesPerRound][strikesPerGame]
    var bounds = {
      // Two strikes
      2: {
        // Head-to-head
        2: {
          // Best-of-1
          1: {1: [2, 127]},
          // Best-of-3
          3: {1: [4, 63]},
          // Best-of-5
          5: {1: [4, 8]},
          // Best-of-7
          7: {1: [4, 4]}
        },
        // Three-player groups
        3: {
          // Best-of-1
          1: {1: [6, 140], 2: [6, 512]}
        },
        // Four-player groups
        4: {
          // Best-of-1
          1: {1: [8, 15], 2: [8, 256], 3: [8, 511]}
        }
      },
      3: {
        2: {
          1: {1: [4, 254]},
          3: {1: [4, 31]},
          5: {1: [4, 5]},
          7: {1: [4, 5]}
        },
        3: {
          1: {2: [6, 512]}
        }
      },
      4: {
        2: {
          1: {1: [4, 452]},
          3: {1: [4, 14]},
          5: {1: [4, 5]},
          7: {1: [4, 5]}
        },
        3: {
          1: {2: [6, 512]}
        }
      }
    };

    if (this.players < bounds[this.strikes][this.playersPerGame][this.gamesPerRound][this.eliminated][0] || this.players > bounds[this.strikes][this.playersPerGame][this.gamesPerRound][this.eliminated][1]) {
      throw new Error('You have too many or too few players players');
    }

    if (this.strikes === 2) {
      if (this.playersPerGame === 2) {
        if (this.eliminated === 1) {
          if (this.gamesPerRound === 1) {
            if (this.players <= 2) {
              return 3;
            } else if (this.players <= 3) {
              return 4;
            } else if (this.players <= 4) {
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
            }
          } else if (this.gamesPerRound === 3) {
            if (this.players <= 4) {
              return 13;
            } else if (this.players <= 5) {
              return 14;
            } else if (this.players <= 7) {
              return 15;
            } else if (this.players <= 8) {
              return 16;
            } else if (this.players <= 14) {
              return 18;
            } else if (this.players <= 16) {
              return 19;
            } else if (this.players <= 23) {
              return 20;
            } else if (this.players <= 24) {
              return 21;
            } else if (this.players <= 39) {
              return 23;
            } else if (this.players <= 40) {
              return 24;
            } else if (this.players <= 63) {
              return 25;
            }
          } else if (this.gamesPerRound === 5) {
            if (this.players <= 4) {
              return 20;
            } else if (this.players <= 5) {
              return 22;
            } else if (this.players <= 7) {
              return 24;
            } else if (this.players <= 8) {
              return 26;
            }
          } else if (this.gamesPerRound === 7) {
            if (this.players <= 4) {
              return 28;
            }
          }
        }
      } else if (this.playersPerGame === 3 && this.gamesPerRound === 1) {
        if (this.eliminated === 2) {
          if (this.players <= 9) {
            return 6;
          } else if (this.players <= 26) {
            return 8;
          } else if (this.players <= 27) {
            return 9;
          } else if (this.players <= 80) {
            return 11;
          } else if (this.players <= 216) {
            return 12;
          } else if (this.players <= 512) {
            return 14;
          }
        } else if (this.eliminated === 1) {
          if (this.players <= 7) {
            return 10;
          } else if (this.players <= 9) {
            return 11;
          } else if (this.players <= 11) {
            return 12;
          } else if (this.players <= 14) {
            return 14;
          } else if (this.players <= 19) {
            return 15;
          } else if (this.players <= 26) {
            return 16;
          } else if (this.players <= 40) {
            return 18;
          } else if (this.players <= 52) {
            return 20;
          } else if (this.players <= 71) {
            return 21;
          } else if (this.players <= 98) {
            return 23;
          } else if (this.players <= 139) {
            return 24;
          } else if (this.players <= 140) {
            return 26;
          }
        }
      } else if (this.playersPerGame === 4 && this.gamesPerRound === 1) {
        if (this.eliminated === 3) {
          if (this.players <= 15) {
            return 10;
          } else if (this.players <= 52) {
            return 12;
          } else if (this.players <= 169) {
            return 14;
          } else if (this.players <= 511) {
            return 16;
          }
        } else if (this.eliminated === 2) {
          if (this.players <= 14) {
            return 14;
          } else if (this.players <= 23) {
            return 16;
          } else if (this.players <= 39) {
            return 18;
          } else if (this.players <= 63) {
            return 20;
          } else if (this.players <= 127) {
            return 22;
          } else if (this.players <= 255) {
            return 24;
          } else if (this.players <= 256) {
            return 26;
          }
        } else if (this.eliminated === 1) {
          if (this.players <= 8) {
            return 20;
          } else if (this.players <= 10) {
            return 22;
          } else if (this.players <= 14) {
            return 24;
          } else if (this.players <= 15) {
            return 26;
          }
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
