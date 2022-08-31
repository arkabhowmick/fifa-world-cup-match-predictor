module.exports = class Team {
  /**
   * @type string
   */
  name;
  /**
   * @type number
   */
  rank;

  constructor(name, rank) {
    this.name = name;
    this.rank = rank;
  }
};
