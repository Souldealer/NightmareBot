const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let guildicon = message.guild.iconURL
  let botembled = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#e6b800")
    .setThumbnail(guildicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

  return message.channel.send(botembled)
}

module.exports.help = {
  name: "serverinfo"
}
