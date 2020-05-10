const fs = require('fs');

const rawNodePosition = require('./assets/node_position.json');
const rawNeighbor = require('./assets/node_data.json');

const nodes = [];

for (let [key, value] of Object.entries(rawNodePosition)) {
  let node = {
    id: key,
    terrain: getTerrain(key),
    position: value,
  };
  nodes.push(node);
}

const edgesSet = new Set();
const edges = []

for (let [from, toArr] of Object.entries(rawNeighbor)) {
  for (let to of toArr) {
    if (edgesSet.has(from + to)) console.error(from, to, 'repeated');
    edgesSet.add(from + to);
  }
}

for (let [from, toArr] of Object.entries(rawNeighbor)) {
  for (let to of toArr) {
    if (edgesSet.has(from + to)) {
      edges.push({ from, to });
      if (!edgesSet.has(to + from)) console.error(from, to, 'not each other');
      edgesSet.delete(to + from);
    }
  }
}


function getTerrain(id) {
  const terrain = {
    r: 'resource',
    p: 'plain',
    f: 'forest',
    m: 'mountain',
    o: 'ocean',
    b: 'boss'
  };
  return terrain[id[0]];
}

let edgesCount = 0;
for (let key in rawNeighbor) {
  edgesCount += rawNeighbor[key].length;
}

console.log(Object.keys(rawNodePosition).length, edgesCount);
console.log(nodes.length, edges.length);

fs.writeFile('./famine.json', JSON.stringify({ nodes, edges }, null, 2), (err) => {
  console.error(err);
});