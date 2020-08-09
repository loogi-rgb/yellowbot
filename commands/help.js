var mainjs = require('../fn.js');
const fn = require('../fn.js');

module.exports = {
    name: 'help',
    description: 'help',
    usage: "",
    permissions: [],
    cooldown: 3,
    guild: false,
    async execute(message, packet, client) {
        message.channel.send(fn.sMsg(`bababooey`));
    },
};