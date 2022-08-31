const fs = require('fs');
const Group = require('./group');
const Team = require('./team');
const Match = require('./match');

const ro16groupings = [
  { t1: 'A', p1: 0, t2: 'B', p2: 1 },
  { t1: 'C', p1: 0, t2: 'D', p2: 1 },
  { t1: 'E', p1: 0, t2: 'F', p2: 1 },
  { t1: 'G', p1: 0, t2: 'H', p2: 1 },
  { t1: 'A', p1: 1, t2: 'B', p2: 0 },
  { t1: 'C', p1: 1, t2: 'D', p2: 0 },
  { t1: 'E', p1: 1, t2: 'F', p2: 0 },
  { t1: 'G', p1: 1, t2: 'H', p2: 0 },
];

module.exports = class GroupStage {
  /**
   * @type Group[]
   */
  groups = [];
  /**
   * @type Match[]
   */
  brackets;

  constructor() {
    this.groupsData = JSON.parse(fs.readFileSync('teams.json'));
  }

  createGroups() {
    for (const group of this.groupsData) {
      const g = new Group(group.n);
      for (const team of group.t) {
        g.addTeam(new Team(team.n, team.r));
      }
      this.groups.push(g);
    }
  }

  async playGroupStages() {
    for (const group of this.groups) {
      await group.playMatches();
    }
    this.qualified = this.getQualifiedTeams();
  }

  /**
   * @returns {{group: string, teams: Team[]}[]}
   */
  getQualifiedTeams() {
    const qualified = [];
    for (const group of this.groups) {
      qualified.push({
        group: group.groupName,
        teams: group.getQualifiedTeams(),
      });
    }
    return qualified;
  }

  createRo16Brackets() {
    this.brackets = ro16groupings.map(
      (grouping) =>
        new Match(
          this.getTeam(grouping.t1, grouping.p1),
          this.getTeam(grouping.t2, grouping.p2)
        )
    );
  }

  /**
   * @param {string} group
   * @param {number} position
   * @returns {Team}
   */
  getTeam(group, position) {
    return this.qualified.find((g) => g.group === group).teams[position];
  }

  printTable(filename) {
    let table = '';
    for (const group of this.groups) {
      table += group.toString();
    }
    fs.appendFileSync(filename, table);
  }
};
