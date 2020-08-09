        /*/
             YellowBot
          coded by Vivida
                         /*/
var chalk = require("chalk");
console.log(chalk.yellowBright(
`      


╔╗  ╔╗    ╔╗ ╔╗           ╔══╗      ╔╗ 
║╚╗╔╝║    ║║ ║║           ║╔╗║     ╔╝╚╗
╚╗╚╝╔╝╔══╗║║ ║║ ╔══╗╔╗╔╗╔╗║╚╝╚╗╔══╗╚╗╔╝
 ╚╗╔╝ ║╔╗║║║ ║║ ║╔╗║║╚╝╚╝║║╔═╗║║╔╗║ ║║ 
  ║║  ║║═╣║╚╗║╚╗║╚╝║╚╗╔╗╔╝║╚═╝║║╚╝║ ║╚╗
  ╚╝  ╚══╝╚═╝╚═╝╚══╝ ╚╝╚╝ ╚═══╝╚══╝ ╚═╝                                    
`))
console.log(chalk.blueBright(
`
::
    LOADING...
    -----------
`));

//// SETUP

/// Dependencies
var Discord = require("discord.js");
console.log(chalk.blueBright(`    discord.js`))
var fs = require('fs');
console.log(chalk.blueBright(`    fs`))

console.log(chalk.blueBright(`    chalk`))
const client = new Discord.Client();
console.log(chalk.blueBright(`    client`))
client.commands = new Discord.Collection();
console.log(chalk.blueBright(`    cmd array`))
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
console.log(chalk.blueBright(`    cmd files`))

var config = require('./settings.json');
var {print, sMsg} = require('./fn');
console.log(chalk.blueBright(`    configs`))
console.log(chalk.blueBright(`    functions`))
/// Variables
var messages = ["Welcome to Yellow's Home! Before you enter, you'll need to read the <#732882130375278643> channel. We'll give you a good 4-5 minutes on that one. After said time has passed, we'll send you the file you need to pick that you'll repeat after us to get into the server. If you get it incorrect you will be kicked. We'll be back in 5!", "Hello! We're back, hopefully you read the rules, if not then please do. **Your selector code is:**", "**Please react in <#732881379670491168> with that member letter. If you get it wrong, you'll be kicked.**"];

const cooldowns = new Discord.Collection();

var statusMsg = "Project 64: PROJECT POWER 95";

var codes = [];
console.log(chalk.blueBright(`    cooldowns`))
console.log(chalk.blueBright(`    status msg`))
console.log(chalk.blueBright(`    codes`))



//// STARTUP CODE



/// Load commands
console.log(chalk.blueBright(`
    COMMANDS
    ---------
`))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
    console.log(chalk.blueBright(`    ${command.name}`))
}
console.log(chalk.blueBright(`
                    ::`));
console.log("\n-----------------------------\n")

//// EVENTS

/// Bot Initialise
client.on("ready", () => {
    print(`v${config.versions.framework} loaded`);
    client.user.setPresence({activity: {name: statusMsg}}).then(print("Playing " + statusMsg)).catch(console.error);
})

/// On message
client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    // message packet
    var packet = {
        "args": message.content.slice(config.prefix.length).trim().split(/ +/),
        "commandName": message.content.slice(config.prefix.length).trim().split(/ +/).shift().toLowerCase(),
        "command": client.commands.get(message.content.slice(config.prefix.length).trim().split(/ +/).shift().toLowerCase())
    }
    if (!client.commands.has(packet.commandName)) return;
    if (message.channel.id != "740957254051823636" && message.channel.id != "732905529524879433" && message.channel.id != "732899739649179669" && message.channel.id != "732901864689107055") return;
    if (!cooldowns.has(packet.command.name)) {
        cooldowns.set(packet.command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(packet.command.name);
    const cooldownAmount = (packet.command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(sMsg(`Wait ${timeLeft.toFixed(1)} more second(s) before using \`${packet.command.name}\`.`));
        }
    }

    if (packet.command.args && !packet.args.length) return message.channel.send(sMsg(`\`${config.prefix + packet.commandName}  ${packet.command.usage}\``));
    if (packet.command.guildOnly && message.channel.type !== 'text') return message.channel.send(sMsg(`This command only works in servers.`));
    try {
        packet.command.execute(message, packet, client);
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    } catch (error) {
        console.error(error);
        message.channel.send(sMsg(":x:  Uh oh, something went wrong. Don't worry, the developers will get their hands on this one."));
    }

    return;
})

/// Literally anything (raw)
client.on('raw', async packet => {
    if (!['MESSAGE_REACTION_ADD'].includes(packet.t)) return;
    const channel = client.channels.cache.get(packet.d.channel_id);
    if (channel.messages.cache.has(packet.d.message_id)) return;
    channel.messages.fetch(packet.d.message_id).then( async message => {
        // const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        const reaction = message.reactions.cache.get(packet.d.emoji.id);
        if (reaction) reaction.users.cache.set(packet.d.user_id, client.users.cache.get(packet.d.user_id));
        else return;
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.cache.get(packet.d.user_id));
        }
    });
});

/// Member joining server
client.on("guildMemberAdd", async member => {
    print("Member" + chalk.yellow("(" + `${member.user.tag} | ${member.user.id}` + ")") + "joined.", "Verification");
    member.roles.add("739808310336815174");
    var embedOne = new Discord.MessageEmbed()
    .setColor("BLUE").setTitle("Verification").setDescription(messages[0]).setAuthor("Thanks for coming!");
    member.send(embedOne);
    setTimeout(async function () {
        print("5 minutes since rule timeout on member" + chalk.yellow("(" + `${member.user.tag} | ${member.user.id}` + ")"));
        var fourLetterArray = ["A", "B", "C", "D"];
        var code = fourLetterArray[Math.floor(Math.random() * fourLetterArray.length)];
        var emojis = ["733025100835848243", "733025128408940594", "733025143969939576", "733025159363035158"];
        var rightEmoji;
        switch (code) {
            case "A":
                rightEmoji = emojis[0];
            break;
            case "B":
                rightEmoji = emojis[1];
            break;
            case "C":
                rightEmoji = emojis[2];
            break;
            case "D":
                rightEmoji = emojis[3];
            break;
        }
        codes.push({"id": member.id, "code": code, "eID": rightEmoji});
        member.roles.remove("739808310336815174");
        var embedTwo = new Discord.MessageEmbed()
        .setColor("BLUE").setTitle("Verification").setDescription(messages[1] + `\n\n***Member ` + code + `***\n\n` + messages[2]).setAuthor("Take all the time you want.");    
        member.send(embedTwo);
    }, 300000)
    // 10000 = 10 seconds
    // 300000 = 5 minutes
})

/// Reaction added to message
client.on("messageReactionAdd",  async (messageReaction, user) => {
    var emojis = ["733025100835848243", "733025128408940594", "733025143969939576", "733025159363035158"];
    var guild = messageReaction.message.guild;
    var roles = ["732886231159013399", "732886296342691850", "732886339040575518", "732886369705263127"];
    // starboard
    if (messageReaction.emoji.id == "741017297774313572") {
        client.channels.cache.get("741015891281707029").send(new Discord.MessageEmbed().setColor("YELLOW").setAuthor("Message Link", "", messageReaction.message.url).setTitle("<:starboard:741017297774313572>  Star Added | " + messageReaction.message.author.tag).setDescription(messageReaction.message.content));
        return;
    }
    // starboard // end
    if (messageReaction.message.id != "733029253557518347") return;
    for (var i = 0 in codes) {
        if (codes[i].id != user.id) {
            return i + 1;
        }
        // remove from array
        var retardvariable = messageReaction.emoji.id;
        if (retardvariable != codes[i].eID) {
            user.send("> **(e01)** You failed to verify yourself correctly, therefore you have been kicked. Please come back and try again if you want to join the server.");
            guild.members.cache.get(codes[i].id).kick();
            print(chalk.yellow("(" + `${user.tag} | ${user.id}` + ")") + " kicked", "Verification")
            return;
        }
        switch (codes[i].eID) {
            case emojis[0]:
                guild.members.cache.get(codes[i].id).roles.add("732886407818903614");
                guild.members.cache.get(codes[i].id).roles.add(roles[0]).then(user.send("> You passed verification."));
                break;
            case emojis[1]:
                guild.members.cache.get(codes[i].id).roles.add("732886407818903614");
                guild.members.cache.get(codes[i].id).roles.add(roles[1]).then(user.send("> You passed verification."));
                break;
            case emojis[2]:
                guild.members.cache.get(codes[i].id).roles.add("732886407818903614");
                guild.members.cache.get(codes[i].id).roles.add(roles[2]).then(user.send("> You passed verification."));
                break;
            case emojis[3]:
                guild.members.cache.get(codes[i].id).roles.add("732886407818903614");
                guild.members.cache.get(codes[i].id).roles.add(roles[3]).then(user.send("> You passed verification."));
                break;
            default:
                user.send("> **(e02)** You failed to verify yourself correctly, therefore you have been kicked. Please come back and try again if you want to join the server.");
                guild.members.cache.get(codes[i].id).kick();
                print(chalk.yellow("(" + `${user.tag} | ${user.id}` + ")") + " kicked", "Verification")
                break;
        }
        var index = codes.indexOf(codes[i]);
        if (index > -1) { codes.splice(index, 1) }
    }
})


// and of course we gotta login
client.login(config.token)
