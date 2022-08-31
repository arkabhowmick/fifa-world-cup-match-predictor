const Team = require('./team');
const Match = require('./match');
const fs = require('fs');

module.exports = class Knockout {
  /**
   * @type Match[]
   */
  matches;
  /**
   * @type Team[]
   */
  qualified = [];
  /**
   * @param {Match[]} matches
   */
  constructor(matches) {
    this.matches = matches;
  }

  async playMatches() {
    for (const match of this.matches) {
      await match.play();
      this.qualified.push(match.winner);
    }
  }

  /**
   * @returns Match[]
   */
  getQualifiedBrackets() {
    /**
     * @type Match[]
     */
    const brackets = [];
    for (let i = 0; i < this.qualified.length; i += 2) {
      brackets.push(new Match(this.qualified[i], this.qualified[i + 1]));
    }
    return brackets;
  }

  printMatches(filename) {
    let table = '';
    for (const match of this.matches) {
      table += match.toString() + '\n';
    }
    fs.appendFileSync(filename, table + '\n\n');
  }
};
