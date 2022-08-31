const GroupStage = require('./group-stage');
const Knockout = require('./knockout');

const fs = require('fs');

async function main() {
  const filename = createFile();
  console.log(filename);
  const groupStage = new GroupStage();
  groupStage.createGroups();
  await groupStage.playGroupStages();
  groupStage.createRo16Brackets();
  groupStage.printTable(filename);
  const ro16 = new Knockout(groupStage.brackets);
  await ro16.playMatches();
  ro16.printMatches(filename);
  const quarters = new Knockout(ro16.getQualifiedBrackets());
  await quarters.playMatches();
  quarters.printMatches(filename);
  const semis = new Knockout(quarters.getQualifiedBrackets());
  await semis.playMatches();
  semis.printMatches(filename);
  const final = new Knockout(semis.getQualifiedBrackets());
  await final.playMatches();
  final.printMatches(filename);
}

function createFile() {
  const d = new Date();
  const filename = `results/${
    d.getMonth() + 1
  }-${d.getDate()}-${d.getHours()}-${d.getMinutes()}.txt`;
  fs.writeFileSync(filename, '');
  return filename;
}

main();
