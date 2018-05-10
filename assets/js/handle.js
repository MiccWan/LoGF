'use strict'

const setup = require('./setup.js');

function nextPhase(game) {
    const phases = ['move', 'trigger', 'build', 'collect'];
    game.phases = phases[(phases.indexOf(game.phases) + 1) % 4];
}

function shufflePlayer(game) {
    game.turn = 0;
    ++ game.round;
    game.players.sort((p1, p2) => return p1.potential < p2.potential);
    for(let i in game.players) for(let j in game.players) {
        if(i === j) continue;
        if(game.players[i].potential !== game.players[j].potential) continue;
        [game.players[i], game.player[j]] = [game.players[j], game.players[i]];
    }
}

var adapter = {
    'refresh': (data, game, socket) => {
        socket.emit('response', {
            'type': 'refresh',
            'status': game
        })
    },
    'start': (data, trash, socket) => {
        let isPlayerName = true, countPlayer = 0;
        if(data.name.length !== 4) isPlayerName = false;
        for(let i in data.name) {
            if(typeof(data.name[i]) !== 'string') isPlayerName = false;
            else if(data.name[i] !== '') ++countPlayer;
        }
        if(isPlayerName === false || !(countPlayer >= 2 && countPlayer <= 4)) {
            socket.emit('response', {
                'type': 'start'
            });
            return undefined;
        }
        let information = setup(data.name);
        socket.emit('response', {
            'type': 'start',
            'game': information
        });
        return information.game;
    },
    'move': (data, game, socket) => {
        if(game.phase !== 'move') return;
        if(typeof(data.destination) !== 'string') return;
        const requirement = {
            'p': { 'action':1 },
            'f': { 'action':2 },
            'm': { 'action':3 },
            'o': { 'action':2, 'oxygen':3 },
            'b': { 'action':2, 'oxygen':3 }
        };
        if(typeof(requirement[data.destination[0]]) !== 'object') return;
        if(typeof(game.allnode[data.destination]) !== 'object') return;
        let currentPlayer = game.players[game.turn];
        let currentPosition = currentPlayer.location;
        if(currentPosition === data.destination) {
            if(currentPlayer.action < 1) return;
            currentPlayer.action -= 1;
        }
        else{
            if(game.allnode[currentPosition].neighbors.indexOf(data.destination) === -1) return;
            let movable = true;
            Object.entries(requirement[data.destination[0]]).forEach(([key, val]) => {
                if(currentPlayer[key] < val) movable = false;
            });
            if(!movable) return;
            Object.entries(requirement[data.destination[0]]).forEach(([key, val]) => {
                currentPlayer[key] -= val;
            });

            let players = game.allnode[currentPlayer.location].players;
            players.splice(players.indexOf(currentPlayer.playerName), 1);
            game.allnode[data.destination].players.push(currentPlayer.playerName);
            currentPlayer.location = data.destination;
        }

        currentPlayer.isMoved = true;
        nextPhase(game);
        socket.emit('response', {
            'type': 'move',
            'game': game,
            'destination': data.destination,
            'player': currentPlayer.playerName
        });
    },
    'skip': (data, game, socket) => {
        if(game.phase !== 'move') return;
        if(!game.players[game.turn].isMoved) return;
        game.players[game.turn].isMoved = false;
        ++ game.turn;

        if(game.turn === game.players.length) shufflePlayer(game);
        socket.emit('response', {
            'type': 'skip',
            'game': game
        });
    }
}

function handler(data, game, socket) {
    if(typeof(data) !== 'object') return;
    if(data.type === undefined) return;
    if(typeof(adapter[data.type]) !== 'function') return;
    return adapter[data.type](data, game, socket);
}

module.exports = handler;
