
const Discord = require('discord.js');
const client = new Discord.Client();


const TOKEN = "NzUxODM0MzEwNDMyMTI5MTAx.X1O2RA.Poh8bvDHyRAQt6AgiEEDddbjO9I";
var prefix = "+";
var muteMembersLength = 0;
var muteListMembers = [];
var activeUnmmute = -1;
client.on('message', message => {
    if (message.content.charAt(0) == prefix) {
    var args = message.content.slice(prefix.length).trim().split(" ");
    var command = args.splice(1);
    var temp = args;
    var args = command;
    var command = temp;
console.log(command);
console.log(args);
    if(command=="args") {
        message.channel.send("args are:" + args);
    }

    if(command=="help") {
        var embed = {
            color: 0xffffff,
            title: 'Help',
            fields: [
                {
                    name: 'help',
                    value: 'Sends this help message',
                },
                {
                    name: 'joinvoice',
                    value: 'Joins your voice channel',
                },
                {
                    name: 'muteall',
                    value: 'Mutes everyone in your voice channel',
                },
                {
                    name: 'unmuteall',
                    value: 'Unmutes everyone in your voice channel',
                },
                {
                    name: 'makelist',
                    value: 'Makes a list to cycle through',
                },
                {
                    name: 'next',
                    value: 'Cycles through the list, and @s the next person',
                },
                {
                    name: 'mutenext',
                    value: 'Cycles through the list, @s and mutes the next person',
                },
                {
                    name: 'zebobwinnsprefix',
                    value: "Changes the bot's prefix",
                },
            ],
        };
        
        message.channel.send({ embed: embed });
    }

    if (command == "timer") {
        var time = args[0];
        message.channel.send(time).then(sentMessage =>  setInterval(() => {
            time = time - 5;
            if (time <= 0) {
            sentMessage.edit("Ring ring, times up!");
            }
          else {
            sentMessage.edit(time);
          }
        }, 5000))
        }
    

    if(command=="joinvoice") {
        if (message.member.voice.channel) {
            var connection = message.member.voice.channel.join();
            message.channel.send("Joined Voice!")
        }
        else{
            message.channel.send("You're not in a voice channel, silly!")
        }
        }


        }
});


client.on('message', message => {doPromise(message)});

async function doPromise(message) {
    if (message.content.charAt(0) == prefix) {
        var args = message.content.slice(prefix.length).trim().split(" ");
        var command = args.splice(1);
        var temp = args;
        var args = command;
        var command = temp;
    console.log(command);
    console.log(args);
        
        if(command=="muteall") {
            if (message.member.voice.channel) {
                var connection = message.member.voice.channel
                
                message.channel.send("Muted everyone. They really need to STFU");
                 let channel = message.member.voice.channel;
                 const members = channel.members;
                 members.forEach(member => {
                    member.voice.setMute(true);
                });
            }
            else{
                message.channel.send("You're not in a voice channel, silly!")
            }
            }
    

            if(command=="unmuteall") {
                if (message.member.voice.channel) {
                    var connection = message.member.voice.channel;
                    
                    message.channel.send("Unmuted everyone, the have regained talking privlages.");
                     let channel = message.member.voice.channel;
                     const members = channel.members;
                     members.forEach(member => {
                        member.voice.setMute(false);
                    });
                }
                else{
                    message.channel.send("You're not in a voice channel, silly!")
                }
                }



    if (command == "makelist") {

        var i = 0;
        muteMembersLength = args.length;
       while (i < args.length) {
           muteListMembers[i] = getUserFromMention(args[i]);
           i++;
       }
       activeUnmmute = 0;
       if (getUserNamesFromList(muteListMembers) == "") {
           message.channel.send("Bro, you didnt even mention anyone.")
       }
       else {
       console.log("List: " +muteListMembers+" is " +muteMembersLength+ " people long.");
       message.channel.send("The list includes"+getUserNamesFromList(muteListMembers)+".")

           if (activeUnmmute > muteMembersLength - 2) {
               activeUnmmute = 0;
           }
           else {
           activeUnmmute++
           }
           message.channel.send(message.guild.members.cache.get(muteListMembers[activeUnmmute].id).toString()+", you are up!");
}
}


        if (command == "mutenext") {
            if (activeUnmmute > muteMembersLength - 2) {
                activeUnmmute = 0;
            }
            else {
            activeUnmmute++
            }
            muteListMembers.forEach(function(member){
            message.guild.members.cache.get(member.id).voice.setMute(true);
            })
            message.guild.members.cache.get(muteListMembers[activeUnmmute].id).voice.setMute(false);
            message.channel.send(message.guild.members.cache.get(muteListMembers[activeUnmmute].id).toString()+", you are up!");
        }


        if (command == "next") {
            if (muteMembersLength !== 0) {
            if (activeUnmmute > muteMembersLength - 2) {
                activeUnmmute = 0;
            }
            else {
            activeUnmmute++
            }
            message.channel.send(message.guild.members.cache.get(muteListMembers[activeUnmmute].id).toString()+", you are up!");
        }
        else {
            message.channel.send("Use +makelist first.")
            }
    }

        if (command == 'zebobwinnsprefix') {
            if (typeof args[0] == 'undefined') {
                message.channel.send("You need to designate a prefix.")
            }
            else if (args[0].length > 1) {
                message.channel.send("Prefix can only be 1 character long!")
            }
            else {
                prefix = args[0];
                message.channel.send("Prefix changed to "+args[0])
            }
        }
            }
}


function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}


function getUserNamesFromList(list) {
    var i = 0;
    var returnString = ""
    while (list.length > i) {
        returnString = returnString+", "+list[i].toString();
        console.log(returnString);
        i++
    }
    return returnString;
    }

client.login(TOKEN);
console.log(`Logged in as `+TOKEN)