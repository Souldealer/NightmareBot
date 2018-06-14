const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let newMember = message.member;
  if (!newMember)
  {
    message.delete();
    return;
  }

  let gRole = message.guild.roles.find(`name`, "Member")
  if (!gRole)
  {
    message.delete();
    return;
  }

  if(newMember.roles.has(gRole.id));
  await(newMember.addRole(gRole.id));

  try
  {
    newMember.send(`Welcome to the guild, you are now a ${gRole.name} of NightmareDynasty!`);
  }
  catch(e)
  {
    message.delete();
    return;
  }

  message.delete();
  return;
}

module.exports.help = {
  name: "accept"
}
