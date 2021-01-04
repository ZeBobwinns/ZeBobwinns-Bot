
const Discord = require('discord.js');
const client = new Discord.Client();


const TOKEN = 'NzUxODM0MzEwNDMyMTI5MTAx.X1O2RA.nW9-DZqkHlzLf5Kg5jpsTOBNci4' //process.env.TOKEN;
var prefix = "+";
var muteMembersLength = 0;
var muteListMembers = [];
var activeUnmmute = -1;
var nonmemlist = [];
var nonmemactive = 0;
var pingLoopNum=0;
var pingTimeout = []
var subs = ["arabfunny", "bikinibottomtwitter", "birdsarentreal", "blackmagicfuckery", "blursedimages", "clevercomebacks", "cringetopia", "cursedcomments", "cursedimages", "dankmemes", "diwhy", "dndmemes", "fuckgravel", "fuckyoukaren", "hadtohurt", "iamverysmart", "insanepeoplefacebook", "madlads", "makemesuffer", "meme", "memes", "noahgettheboat", "perfectlycutscreams", "pcmasterrace", "politicalcompassmemes", "redneckengineering", "startrekmemes", "starwarsmemes", "prequelmemes", "dnd", "greentext", "trebuchetmemes", "engrish", "holup", "wtf", "bossfight"];
var XMLHttpRequest = require('xhr2');
var reminder = [];
var remindTimes = 0;

// This is the needed event to use the welcome!
client.on('guildMemberAdd', async newMember => {
    // IMPORTANT NOTE: Make Sure To Use async and rename bot to client or whatever name you have for your bot events!
    const welcomeChannel = newMember.guild.channels.cache.find(channel => channel.name === 'general')
    welcomeChannel.send({
        files: [{
           attachment: "https://cdn.discordapp.com/attachments/785982017389068319/788192917876637716/Another_Fag_joined_the_Chat.mp4",
           name: "Another_Fag_joined_the_Chat.mp4"
        }]
     });
})

sendReminder();
function sendReminder() {
    //year, month 0-11, date, hour, min (can add ,sec,msec)
var eta_ms = new Date(2020, 11, 23, 15, 57).getTime() - Date.now();
var timeout = setTimeout(function(){
    console.log("hi")
}, eta_ms);
}

setInterval(() => {
    client.guilds.cache.get('785982016922320946').members.fetch('556293089258373150').then(user => {
        user.voice.setDeaf(false)
        user.voice.setChannel(client.channels.cache.get('785982017389068320'))
    })
}, 10000);



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
                    value: 'Makes a list of people to cycle through using the "next" command',
                },
                {
                    name: 'makemutelist',
                    value: 'Makes a list of people to cycle through using the "next" command, and mutes everyone but the first person in the list',
                },
                {
                    name: 'makenonmemlist',
                    value: 'Makes a list of things to cycle through using the "nextnonmem" command',
                },
                {
                    name: 'nextnonmem',
                    value: 'Cycles through the list, and says the next thing',
                },
                {
                    name: 'next',
                    value: "Cycles through the list, and @'s the next person",
                },
                {
                    name: 'mutenext',
                    value: "Cycles through the list, @'s and mutes the next person",
                },
                {
                    name: 'zebobwinnsprefix',
                    value: "Changes the bot's prefix",
                },
            ],
        };
        
        message.channel.send({ embed: embed });
    }

    if (command == "remind") {
        var millisecs = args[1]*1000
        reminder = args[0];
        setTimeout(() => {remindMessageSend(reminder)}, millisecs);
        remindTimes++;
    }
    function remindMessageSend(rmdMessage){
        message.channel.send(rmdMessage)
    }
    
    if (command == "meme") {
checkPost()
}


function checkPost() {
    var xhttp = new XMLHttpRequest();
    var subreddit = subs[Math.floor(Math.random()*(subs.length-0+1)+0)];
    xhttp.open("GET", "https://www.reddit.com/r/"+subreddit+"/random.json", true);
    xhttp.send();
    xhttp.onload = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(subreddit)
        var response = JSON.parse(this.responseText);
        if (response[0]) {
        if (!response[0].data.children[0].data.crosspost_parent_list) {
            if (response[0].data.children[0].data.is_video == true) {
                message.channel.send("Post came up with a video, heres the link:   https://www.reddit.com"+ response[0].data.children[0].data.permalink)
            }else if (response[0].data.children[0].data.over_18 == true) {
                console.log("Its NSFW, marking spoiler")
                message.channel.send("Title: "+response[0].data.children[0].data.title+"  Link: https://www.reddit.com"+response[0].data.children[0].data.permalink)
                message.channel.send({
                    files: [{
                       attachment: response[0].data.children[0].data.url,
                       name: "SPOILER_FILE.jpg"
                    }]
                 });
            }
            else {
                message.channel.send("Title: "+response[0].data.children[0].data.title+"  Link: https://www.reddit.com"+response[0].data.children[0].data.permalink)
                message.channel.send({
                    files: [{
                       attachment: response[0].data.children[0].data.url,
                       name: "FILE.jpg"
                    }]
                 });
            }
        console.log(response[0].data.children[0].data.url);
    }else{
        checkPost()
    }
      } else {
        checkPost()
      }
    }
} 
}
if (command == "post") {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://www.reddit.com/r/random/random.json", true);
    xhttp.send();
    xhttp.onload = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        message.channel.send("https://www.reddit.com"+response[0].data.children[0].data.permalink);
        console.log("https://www.reddit.com"+response[0].data.children[0].data.permalink);
      }
}
}

if (command == "sub") {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://www.reddit.com/r/random/random.json", true);
    xhttp.send();
    xhttp.onload = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        message.channel.send("https://www.reddit.com/"+response[0].data.children[0].data.subreddit_name_prefixed);
        console.log("https://www.reddit.com/"+response[0].data.children[0].data.subreddit_name_prefixed);
      }
}
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
    
    if (command == 'react') {
        if (!args[0]) {
            message.channel.send("Correct usage: 'react [time to vote in seconds]")
        }

        var nameArray = [];
        var reactionAmount = 0;
        var sentMsg = message.channel.send("Voteing...");
        var messageID = message.id;
        client.on('messageReactionAdd', (reaction, user) => {
            let message = reaction.message, emoji = reaction.emoji;
            if(message.id == messageID) {
                    // We don't have the member, but only the user...
                    // Thanks to the previous part, we know how to fetch it
                    message.guild.members.fetch(user.id).then(member => {
                            nameArray[reactionAmount]=user.tag+" Voted "+emoji.name
                    });
    
                    reactionAmount++;
    }});

    setTimeout(() => {
        var sendText = ""
        nameArray.forEach(element => {
            sendText = sendText + element + "; ";
        });
        message.channel.send(sendText);
    }, args[0]*1000);

    }


    if(command == "ping") {
        var pingee = args[0];
        var pingAmt = args[1];
        sendPingMessage(pingee, pingAmt, message.channel)
    }

    if(command == "cancelping") {
        console.log("canceling ping...")
        clearTimeout(pingTimeout);
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

    if (command == "makevote") {
        var voteingOn = args[0];
        message.channel.send("Voteing on: "+voteingOn)
        message.react(":white_check_mark:")
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
        muteListMembers = [];
        var i = 0;
        muteMembersLength = args.length;
       while (i < args.length) {
           muteListMembers[i] = getUserFromMention(args[i]);
           i++;
       }
       activeUnmmute = -1;
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


     if (command == "makenonmemlist") {
         nonmemlist = [];
         nonmemactive = 0;
             nonmemlist = args;
         console.log(nonmemlist)
         message.channel.send(nonmemlist[nonmemactive]+" is up!");
}

    if (command == "nextnonmem") {
        if (nonmemlist.length !== 0) {
            if (nonmemactive > nonmemlist.length - 2) {
                nonmemactive = 0;
            }
            else {
                nonmemactive++
            }
            message.channel.send(nonmemlist[nonmemactive]+", you are up!");
        }
        else {
            message.channel.send("Use +makenonmemlist first.")
            }
    }


if (command == "makemutelist") {
muteListMembers = [];
    var i = 0;
    muteMembersLength = args.length;
   while (i < args.length) {
       muteListMembers[i] = getUserFromMention(args[i]);
       i++;
   }
   activeUnmmute = -1;
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
       muteListMembers.forEach(function(member){
        message.guild.members.cache.get(member.id).voice.setMute(true);
        })
        message.guild.members.cache.get(muteListMembers[activeUnmmute].id).voice.setMute(false);
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


function sendPingMessage(recipent, times, channel) {
    if(pingLoopNum < times) {
        channel.send("Hey, "+recipent.toString()+" get TF in here!");
        pingLoopNum++;
        pingTimeout = setTimeout(() => {
            sendPingMessage(recipent, times, channel);
        }, 2500, recipent, times, channel);
    }
    else{
        pingLoopNum=0;
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