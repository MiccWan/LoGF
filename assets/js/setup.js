'use strict'

const Node     = require('./node.js');
const nodeData = require('../node_data.json');
const nodePosition = require('../node_position.json');
const Player = require('./player.js');

function setupNodes() {
    let allnode = {};
    let nodes = {
        'resource': {},
        'plain':    {},
        'forest':   {},
        'mountain': {},
        'ocean':    {},
        'boss':     {}
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
        for(let i in nodeData[key]) {
            allnode[key].neighbors[i] = nodeData[key][i];
        }
    }
    return [allnode, nodes];
}

function getGraph(nodes) {
    let gNodes = [], gEdges = [];
    for(let category in nodes) {
        for(let nodeKey in nodes[category]) {
            let nNode = { 'id':nodeKey, 'label':nodeKey, 'group':category };
            if(nodePosition[nodeKey] !== undefined) {
                nNode.x = nodePosition[nodeKey].x;
                nNode.y = nodePosition[nodeKey].y;
            }
            gNodes.push(nNode);
            for(let idx in nodes[category][nodeKey]['neighbors']) {
                let to = nodes[category][nodeKey]['neighbors'][idx];
                if(to < nodeKey) continue;
                gEdges.push({ 'from':nodeKey, 'to':to });
            }
        }
    }
    console.log(gNodes);
    return [gNodes, gEdges];
}

function getPlayer(playerName) {
    let players = [];
    for(let i in playerName) {
        let initLocation;
        if(i === 0) initLocation = 'p04';
        if(i === 1) initLocation = 'p07';
        if(i === 2) initLocation = 'p17';
        if(i === 3) initLocation = 'p21';
        players.push(new Player(playerName[i], initLocation));
        // console.log(players)
    }
    return players;
}

function setup(playerName) {
    let [allnode, nodes] = setupNodes();
    let [graphNodes, graphEdges] = getGraph(nodes);
    let players = getPlayer(playerName);
    let startPlayer = 0;
    while(players[startPlayer].playerName === '') ++startPlayer;
    return {
        'game': {
            'turn': startPlayer,
            'phase': 'collect',
            'players': players,
            'map': nodes
        },
        'graphNodes': graphNodes,
        'graphEdges': graphEdges
    }
}

module.exports = setup;
