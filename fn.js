const Discord = require("discord.js");
const chalk = require('chalk');
function print(string = "Print to console was called.", action = "YellowBot") {
    return console.log(`${chalk.cyan('[')}${chalk.yellow(action)}${chalk.cyan(']')} ${string}`);
}

function sMsg(info = "what", image = "") {
    return new Discord.MessageEmbed().setColor("#FFFF66").setDescription(info).setImage(image);
}

module.exports = {
    print, sMsg
}
