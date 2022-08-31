const Team = require('./team');

module.exports = class TableRow {
  /**
   * @type Team
   */
  team;
  /**
   * @type number
   */
  w = 0;
  /**
   * @type number
   */
  l = 0;
  /**
   * @type number
   */
  d = 0;
  /**
   * @type number
   */
  gf = 0;
  /**
   * @type number
   */
  ga = 0;
  /**
   * @type number
   */
  gd = 0;
  /**
   * @type number
   */
  points = 0;
  /**
   * @param {Team} team
   */
  constructor(team) {
    this.team = team;
  }

  /**
   * @param {number} gf
   * @param {number} ga
   */
  update(gf, ga) {
    this.gf += gf;
    this.ga += ga;
    this.gd = this.gf - this.ga;
    if (gf > ga) {
      this.w += 1;
    } else if (gf < ga) {
      this.l += 1;
    } else {
      this.d += 1;
    }
    this.points = this.w * 3 + this.d;
  }
};
