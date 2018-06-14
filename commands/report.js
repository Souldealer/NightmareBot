const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user)
  {
   return message.channel.send("Coulden't find user.");
  }

  let reason = args.join(" ").slice(22);
  if (reason.trim() === "")
  {
     return message.channel.send("Please complete reason for the report.");
  }

  let reportembled = new Discord.RichEmbed()
   .setDescription("Report")
   .setColor("#FF0000")
   .addField("Reported User", `${user} with ID: ${user.id}`)
   .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
   .addField("Channel", message.channel)
   .addField("Time", message.createdAt)
   .addField("Reason", reason);

  let reportChannel = message.guild.channels.find(`name`, "reports")
  if (!reportChannel)
  {
   return message.channel.send("Couldn't find the reports channel");
  }

  message.delete().catch(O_o =>{});
  reportChannel.send(reportembled);
}

module.exports.help = {
  name: "report"
}
