var mainjs = require('../fn.js');
const fn = require('../fn.js');

module.exports = {
    name: 'avatar',
    description: 'This is useful too.',
    usage: "@person#0000",
    args: true,
    permissions: [],
    cooldown: 3,
    guild: true,
    async execute(message, packet, client) {
        if (!message.mentions.members.first()) message.channel.send(fn.sMsg("**" +  message.author.tag + "**'s Avatar", message.author.avatarURL()));
        else message.channel.send(fn.sMsg("**" + message.mentions.users.first().tag + "**'s Avatar", message.mentions.users.first().avatarURL()));
        return;
    },
};