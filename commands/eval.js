var mainjs = require('../fn.js');
const fn = require('../fn.js');
const config = require('../settings.json');

function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

module.exports = {
    name: 'eval',
    description: 'you will NEVER use this!',
    usage: "shut up Bitch Kathrine Lookin Ass",
    permissions: [],
    cooldown: 3,
    guild: false,
    async execute(message, packet, client) {
        if (message.author.id !== config.ownerID) return;
        try {
            packet.args.splice(0, 1)
            const code = packet.args.join(" ");
            fn.print(code, "Eval Input")
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), {
                code: "xl"
            });
            fn.print(clean(evaled), "Eval Output")
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    },
};