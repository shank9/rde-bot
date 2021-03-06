const Discord = require("discord.js"); //baixar a lib
const client = new Discord.Client(); 
const config = require("./config.json");
const token = process.env.token;

//heroku
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'))
.listen(PORT, () => console.log(`Listening on ${ PORT }`))

var http = require('http');
setInterval(() => {
    http.get('http://[app-name].herokuapp.com/');
}, 1000*60*14);

client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
  client.user.setPresence({ game: { name: 'comando', type: 1, url: 'discord.gg/rde'} });
    //0 = Jogando
    //  1 = Transmitindo
    //  2 = Ouvindo
    //  3 = Assistindo
});

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  
  // coamdno ping
  if(comando === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ping)}ms`);
  }
})

  client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  const guild = client.guilds.cache.get("673999211515215912")
  const role = guild.roles.cache.find(r => r.name === "GarticMOD")
  
  if(comando === "playgartic"){
    message.member.roles.add(role)
    return message.reply(`agora você possui o cargo **GarticMOD** 👏`) }  
   else{
    return message.reply(`Você já possui esta role!`)
  }
  
});

  client.on('guildMemberUpdate', (oldMember, newMember) => { 
    const firstRole = newMember.guild.roles.cache.find((r) => r.name == "Membro Ovo 🥚");
       const secondRole = newMember.guild.roles.cache.find((r) => r.name == "Lvl 1. Patético 👌" );
       if (newMember.roles.cache.has(firstRole.id) && newMember.roles.cache.has(secondRole.id)) {
           newMember.roles.remove(firstRole.id, "remover membro ovo");
       }
      }
   );

client.login(token);