const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let botIcon = bot.user.displayAvatarURL;
  let botembled = new Discord.RichEmbed()
    .setDescription("Bot Description")
    .setColor("#e6b800")
    .setThumbnail(botIcon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

  return message.channel.send(botembled)
}

module.exports.help = {
  name: "botinfo"
}
