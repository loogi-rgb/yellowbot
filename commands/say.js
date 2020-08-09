var mainjs = require('../fn.js');
const fn = require('../fn.js');

module.exports = {
    name: 'ping',
    description: 'ping pong!',
    usage: "",
    permissions: [],
    cooldown: 3,
    guild: false,
    async execute(message, packet, client) {
        message.channel.send(fn.sMsg(`:ping_pong:  ${client.ws.ping}ms`));
    },
};