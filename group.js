const Team = require('./team');
const Match = require('./match');
const TableRow = require('./table-row');

module.exports = class Group {
  /**
   * @type string
   */
  groupName;
  /**
   * @type Team[]
   */
  teams = [];
  /**
   * @type TableRow[]
   */
  table = [];
  /**
   * @param {string} name
   */
  constructor(name) {
    this.groupName = name;
  }

  /**
   * @param {Team} team
   */
  addTeam(team) {
    this.teams.push(team);
    this.table.push(new TableRow(team));
  }

  async playMatches() {
    for (let i = 0; i < this.teams.length; i++) {
      const team1 = this.teams[i];
      for (let j = i + 1; j < this.teams.length; j++) {
        const team2 = this.teams[j];
        if (team1.name != team2.name) {
          const match = new Match(team1, team2, true);
          await match.play();
          const t1Index = this.table.findIndex(
            (row) => row.team.name === team1.name
          );
          const t2Index = this.table.findIndex(
            (row) => row.team.name === team2.name
          );
          if (match.isDraw || match.winner.name === team1.name) {
            this.table[t1Index].update(match.score[0], match.score[1]);
            this.table[t2Index].update(match.score[1], match.score[0]);
          } else {
            if (match.winner.name === team2.name) {
              this.table[t2Index].update(match.score[0], match.score[1]);
              this.table[t1Index].update(match.score[1], match.score[0]);
            }
          }
          this.table.sort((t1, t2) => t2.points - t1.points);
        }
      }
    }
  }

  sortTable() {
    this.table.sort((t1, t2) => {
      if (t2.points != t1.points) {
        return t2.points - t1.points;
      } else {
        if (t2.gd != t1.gd) {
          return t2.gd - t1.gd;
        } else {
          if (t2.gf != t1.gf) {
            return t2.gf - t1.gf;
          } else {
            return t2.team.rank - t1.team.rank;
          }
        }
      }
    });
  }

  /**
   * @returns Team[]
   */
  getQualifiedTeams() {
    return [this.table[0].team, this.table[1].team];
  }

  /**
   * @returns string
   */
  toString() {
    let table = '';
    table += `Group ${this.groupName}\n`;
    table += `${this.addSpace('Team')}\tW\tL\tD\tF\tA\tD\tP\n`;
    for (const row of this.table) {
      table += `${this.addSpace(row.team.name)}\t${row.w}\t${row.l}\t${
        row.d
      }\t${row.gf}\t${row.ga}\t${row.gd}\t${row.points}\n`;
    }
    table += '\n\n';
    return table;
  }

  addSpace(input) {
    return (input + '               ').substring(0, 15);
  }
};
