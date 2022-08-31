const Team = require('./team');
const readline = require('readline');
const process = require('process');
const constants = require('./constants');

module.exports = class Match {
  /**
   * @type boolean
   */
  isDraw;
  /**
   * @type boolean
   */
  canDraw;
  /**
   * @type number[]
   */
  score;
  /**
   * @type Team
   */
  team1;
  /**
   * @type Team
   */
  team2;
  /**
   * @type Team
   */
  winner;
  /**
   * @type Team
   */
  loser;
  /**
   * @param {Team} team1
   * @param {Team} team2
   * @param {boolean} canDraw
   */
  constructor(team1, team2, canDraw = false) {
    this.team1 = team1;
    this.team2 = team2;
    this.canDraw = canDraw;
  }

  /**
   * @returns {Promise<void>}
   */
  async play() {
    const minDiff = constants.RANK_DIFF;
    const rankDiff = Math.abs(this.team1.rank - this.team2.rank);
    if (rankDiff > minDiff) {
      this.score = [2, 0];
      if (this.team1.rank < this.team2.rank) {
        this.winner = this.team1;
        this.loser = this.team2;
      } else if (this.team1.rank > this.team2.rank) {
        this.winner = this.team2;
        this.loser = this.team1;
      } else {
        this.score = [0, 0];
        this.isDraw = true;
      }
    } else {
      const { winner, loser, draw, score } = await fetchResult(
        this.team1,
        this.team2,
        this.canDraw
      );
      this.score = score;
      if (draw) {
        this.isDraw = true;
      } else {
        this.winner = winner;
        this.loser = loser;
      }
    }
  }

  /**
   * @returns {string}
   */
  toString() {
    return `${this.winner.name}(${this.score[0]}) - ${this.loser.name}(${this.score[1]})`;
  }
};

/**
 * @param {Team} team1
 * @param {Team} team2
 * @param {boolean} canDraw
 * @returns {Promise<{ winner: Team, loser: Team, draw: boolean, score: number[] }>}
 */
function fetchResult(team1, team2, canDraw = false) {
  return new Promise((resolve) => {
    const question = `${team1.name}-${team2.name} ${
      canDraw ? '( Can Draw )' : '( Cannot Draw )'
    } \nEnter Score: `;
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (answer) => {
      answer = answer.trim();
      let score = answer.split('-');
      score = score.map((s) => Number(s.trim()));

      if (score[0] != score[1] || canDraw) {
        rl.close();
        if (score[0] > score[1]) {
          resolve({
            winner: team1,
            loser: team2,
            draw: false,
            score: [score[0], score[1]],
          });
        } else if (score[1] > score[0]) {
          resolve({
            winner: team2,
            loser: team1,
            draw: false,
            score: [score[1], score[0]],
          });
        } else {
          resolve({ draw: true, score: [score[0], score[1]] });
        }
      } else {
        rl.write(question);
      }
    });
  });
}
