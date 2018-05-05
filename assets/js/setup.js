'use strict'

const Node = require('./node.js').Node;
const nodeData = require('../node_data.json');

function setupNodes() {
    let allnode = {};
    let nodes = {
        'resource': {},
        'plain': {},
        'forest': {},
        'mountain': {},
        'ocean': {},
        'boss': {}
    };
    for(let key in nodeData) {
        allnode[key] = new Node(key);
        if(key[0] === 'r') nodes.resource[key] = allnode[key];
        if(key[0] === 'p') nodes.plain[key]    = allnode[key];
        if(key[0] === 'f') nodes.forest[key]   = allnode[key];
        if(key[0] === 'm') nodes.mountain[key] = allnode[key];
        if(key[0] === 'o') nodes.ocean[key]    = allnode[key];
        if(key[0] === 'b') nodes.boss[key]     = allnode[key];
    }
    for(let key in nodeData) {
        for(let idx in nodeData[key]) {
            allnode[key].neighbors[idx] = allnode[nodeData[key][idx]];
        }
    }
    return [allnode, nodes];
}

function getGraph(nodes) {
    let gNodes = [], gEdges = [];
    for(let category in nodes) {
        for(let nodeKey in nodes[category]) {
            gNodes.push({ 'id':nodeKey, 'label':nodeKey, 'group':category });
            for(let idx in nodes[category][nodeKey]['neighbors']) {
                let to = nodes[category][nodeKey]['neighbors'][idx].id;
                if(to < nodeKey) continue;
                gEdges.push({ 'from':nodeKey, 'to':to });
            }
        }
    }
    return [gNodes, gEdges];
}

function setup() {
    let [allnode, nodes] = setupNodes();
    let [graphNodes, graphEdges] = getGraph(nodes);
}

module.exports = setup;
