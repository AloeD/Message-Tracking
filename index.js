const token = process.env.token
const discord = require('discord.js')
const {MessageEmbed} = require('discord.js')
const db = require('quick.db')
const Client = new discord.Client()


let prefix = "!"

Client.on('message', message => {
  const user = message.mentions.users.first() || message.author
  if(message.author.bot) return;
  let Messages = db.fetch(`MessagesSentt_${message.guild.id}_${user.id}`)
  db.add(`MessagesSentt_${message.guild.id}_${message.author.id}`, 1)

  if(message.content.startsWith(`${prefix}messages`)) {
    if(Messages == null) return message.reply("User has no record of talking in this server.")
    const messagesEmbed = new MessageEmbed()
    .setTitle("Command: Messages")
    .setColor("FFFFFF")
    .addField(`**Messages!**`, `${user.username} has \`${Messages}\` messages.`)
    .setFooter("Credit to Quatenus for this.")
    message.channel.send(messagesEmbed)
  }
if(message.content.startsWith(`${prefix}commandsused`)) {
 let cmdused = db.fetch(`COMMANDSUSED_${user.id}`)
if(cmdused == null) return message.reply("User has no record of using commands in this server.")
  let SENDER = new MessageEmbed()
  .setTitle("*Commands Used\\*")
  .addField("**Commands Used By: " + user.username+"!**", `${user.username} used \`${cmdused + 1}\` `)
  .setFooter("Credit to Quatenus for this.")
message.channel.send(SENDER)
}

  if(message.content.startsWith(prefix)) {
    db.add(`COMMANDSUSED_${message.author.id}`, 1)
  }

})


Client.login(token)
