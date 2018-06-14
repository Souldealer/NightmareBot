const Discord = require("discord.js")
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  let tomute = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));

  if (!tomute)
  {
    return message.channel.send("Couldn't find user.")
  }

  if (!message.member.roles.find("name", "The Cult Leader") && !message.member.roles.find("name", "Moderator"))
  {
    return message.channel.send("You have no permission to mute!")
  }

  let muterole = message.guild.roles.find(`name`, "muted");

  if (!muterole)
  {
    try
    {
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#107DFF",
        permissions:[]
      })

      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false
        });
      })
    }
    catch(e)
    {
      console.log(e.stack);
    }
  }

  let mutetime = args[1];

  if (!mutetime)
  {
    return message.channel.send("You dident specify a time.");
  }

  await(tomute.addRole(muterole.id));
  tomute.setMute(true);
  message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}.`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    tomute.setMute(false);
    message.channel.send(`<@${tomute.id}> has been unmuted.`)
  }, ms(mutetime));
}

module.exports.help = {
  name: "mute"
}
