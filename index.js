const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const {google} = require("googleapis")
require('ffmpeg');
const YouTube = require("discord-youtube-api");
const youtube = new YouTube("AIzaSyAtWqUCvBrJpFCgnDa2uwGsZopVt_a9bAU");

const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey('e0d38638-19dd-47a6-b8af-10fb573be51b');


const TOKEN = process.env.TOKEN;
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
var muteChannel = "noChannel";
var songQueue = [];
var songTimeout;
var bitchList = [];

/*
// initilize phone call thing
const { RelayConsumer } = require('@signalwire/node')

const consumer = new RelayConsumer({
  project: '694cea07-a3ac-4b27-912a-8fd43c95e9d9',
  token: 'PT013a86a967bb14a9e4438dcb96301ac0c11e7499affb2985',
  contexts: ['discordCall'],
  onIncomingCall: async (call) => {
    const { successful } = await call.answer()
    if (!successful) {
      console.error('Answer Error')
      return
    }

    const collect = {
      type: 'digits',
      digits_max: 18,
      digits_min: 18,
      text: 'Welcome to Zacs discord bot! Please, enter voice channel ID'
    }
    const prompt = await call.promptTTS(collect)
    if (prompt.successful) {
      await call.playTTS({ text: `You entered: ${prompt.result}. Entering Call.` })
      client.channels.cache.get(prompt.result).join().then((connection) => 
        {
            connection.play(call.remoteStream);
        });
    }
  }
})


consumer.run()
*/
// This is the needed event to use the welcome!
client.on('guildMemberAdd', async newMember => {
    const welcomeChannel = newMember.guild.channels.cache.find(channel => channel.name === 'general')
    welcomeChannel.send({
        files: [{
           attachment: "https://cdn.discordapp.com/attachments/785982017389068319/788192917876637716/Another_Fag_joined_the_Chat.mp4",
           name: "Another_Fag_Joined_The_Chat.mp4"
        }]
     });
})


//https://github.com/ZeBobwinns/ZeBobwinns-Bot/blob/master/happy%20zac%20noises.mp3?raw=true

client.on('message', message => {
    if (message.content == "*happy zac noises*" || message.content == "*happiness noises*" || message.content == "happy zac noises" || message.content == "happiness noises") {
        message.channel.send("happy zac?");
        message.channel.send({
            files: [{
               attachment: "https://cdn.discordapp.com/attachments/779163670655270915/865406447159476224/happy_zac_noises.mp3",
               name: "Happy Zac Noises.mp3"
            }]
         });
    }
    if (message.content == "*sad zac noises*" || message.content == "*sadness noises*" || message.content == "sad zac noises" || message.content == "sadness noises") {
        message.channel.send("sad zac?");
        message.channel.send({
            files: [{
               attachment: "https://cdn.discordapp.com/attachments/779163670655270915/865409594238042202/sad_zac_noises.mp3",
               name: "Sad Zac Noises.mp3"
            }]
         });
    }

    const isOnList = (element) => element == message.author.id;
    if (bitchList.some(isOnList)) {
        console.log(message.author.id);
        message.channel.send({
            files: [{
               attachment: "https://cdn.discordapp.com/attachments/901121741663899679/980885384856764436/unknown.png",
               name: "Bitch.png"
            }]
         });
    }
}
)



sendReminder();
function sendReminder() {
    //year, month 0-11, date, hour, min (can add ,sec,msec)
var eta_ms = new Date(2020, 11, 23, 15, 57).getTime() - Date.now();
var timeout = setTimeout(function(){
    console.log("hi")
}, eta_ms);
}

setInterval(() => {
    var chris
    client.guilds.cache.get('785982016922320946').members.fetch('565622151890206743').then(user => {
        chris = user;
    })
    client.guilds.cache.get('785982016922320946').members.fetch('556293089258373150').then(user => {
        if (user.voice.channel) {
        user.voice.setDeaf(false)
        user.voice.setMute(false)
        /*console.log(chris.voice.channel)
        if (chris.voice.channel) {
        user.voice.setChannel(chris.voice.channel)
        }*/
    }
    })
    
}, 10000);



client.on('message', message => {
    if (muteChannel == message.channel) {
        message.delete();
    }
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
    if (randomNum(1,20) == 13) {
        xhttp.open("GET", "https://www.reddit.com/r/randnsfw.json", true);
        xhttp.send();
        xhttp.onload = function() {
          if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            message.channel.send("https://www.reddit.com/"+response.data.children[0].data.subreddit_name_prefixed+" (!!NSFW!!)");
            console.log("https://www.reddit.com/"+response.data.children[0].data.subreddit_name_prefixed);
          }
    }
    console.log("Getting NSFW")
    }
    else {
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
}

if (command == "play" || command == "p") {
    var songQuery = collateArray(args);
    if (songQueue.length <= 0) {
        songQueue.push(songQuery);
        console.log(songQueue);
        handleVideoQuery(message, songQuery);
}
    else {
        songQueue.push(songQuery);
        console.log(songQueue);
    }

}

if (command == "queue" || command == "q") {
    sendQueueToChannel(message);
}

if (command == "skip" || command == "s") {
    if (songQueue.length > 1) {
    clearTimeout(songTimeout);
    message.channel.send("Song is over.");
    songQueue.shift;
    console.log(songQueue);
    nextSong(message);
    }
    else if (songQueue.length == 1) {
        songQueue = [];
        message.guild.voice.channel.leave();
        message.channel.send("You've run out of songs in your queue, imma head out.")
    }
    else {
        message.channel.send("You have no songs in the queue.");
    }
}


if (command == "makeimage" || command == "image" || command == "i") {
    message.channel.send("Hold on a sec... makin these pictures takes a while...")
    var request = collateArray(args);
    (async function() {
        var resp = await deepai.callStandardApi("text2img", {
                text: request,
        });
        message.channel.send(resp.output_url)
    })()
    
}


/*
if (command == "testthing") {
    var voice, player;

// To join channel and play
async function main() {
    const yourTask = new Task('694cea07-a3ac-4b27-912a-8fd43c95e9d9', 'PT013a86a967bb14a9e4438dcb96301ac0c11e7499affb2985')
    const context = 'discordCall'
    const data = {
      uuid: 'Call',
      data: ''
    }
    try {
      await yourTask.deliver(context, data)
      console.log("task?")
    } catch (error) {
      console.log('Error creating task!', error)
    }
  }
  
  main().catch(console.error)

// To stop
setTimeout(() => {
    player.end();
    message.member.voice.channel.leave();
}, 30000);
}
*/

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

        if (command == "mute") {
            if (message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("Channel muted for "+args[0]+" seconds").then(() => {
                muteChannel = message.channel; 
            })
            setTimeout(() => {
                message.channel.send("Channel Unmuted")
                muteChannel = "noChannel";
            }, args[0]*1000);
        }
        }

        if (command == "unmute") {
            if (message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("Channel Unmuted")
            muteChannel = "noChannel";
            }
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
        var pingMessage;
        if (args[2]) {
            args.splice(0, 1);
            args.splice(0, 1);
            pingMessage = ", "+collateArray(args);
        }
        else {pingMessage = ", get TF in here!"}
        sendPingMessage(pingee, pingAmt, message.channel, pingMessage)
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

        if(command=="leavevoice" || command=="leave" ) {
            if (message.member.voice.channel) {
                var connection = message.member.voice.channel.leave();
                message.channel.send("Left Voice!")
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

    if (command == "bitch") {
        var bitchMention = args[0];
        var bitchID = getUserFromMention(bitchMention);
        if (bitchList.indexOf(bitchID) == -1) {
            if (args[0]) {
            if (bitchID.bot == false) {
            bitchList.push(bitchID);
            message.channel.send("<@"+bitchID+"> is now a bitch!")
            }
            else {
                message.channel.send("I can't bitchify bots!")
            }
        }
        else {
            message.channel.send("I need a person to bitchify!")
        }
    } else {
        console.log(message.author.id)
        console.log(bitchID.id)
        if (message.author.id !== bitchID.id) {
        bitchList.forEach(element => {
            if (element == bitchID) {
                bitchList.splice(bitchList.indexOf(bitchID),1)
            }
            message.channel.send("<@"+bitchID+"> is no longer a bitch!")
        });
    } else {
        message.channel.send("You can't unbitch yourself, ya fuckin bitch!");
    }
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

    if (command == "define") {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {


            if (this.readyState == 4 && this.status == 200) {

                clearTimeout(defineTimeout);
          var wordArr = JSON.parse(this.responseText);

          var embed = {
            color: 0xffffff,
            title: wordArr[0].word,
            fields: [
                {
                    name: 'Definition',
                    value: wordArr[0].meanings[0].partOfSpeech + "; " + wordArr[0].meanings[0].definitions[0].definition,
                },
                {
                    name: 'Synonyms',
                    value: wordArr[0].meanings[0].definitions[0].synonyms,
                },
                {
                    name: 'Phonetics',
                    value: wordArr[0].phonetics[0].text + "\n" + wordArr[0].phonetics[0].audio,
                },
            ],
        };
        
        message.channel.send({ embed: embed });
            }
        };
        xhttp.open("GET", "https://api.dictionaryapi.dev/api/v2/entries/en_US/" + args[0], true);
        xhttp.send();
        var defineTimeout = setTimeout(() => {
            message.channel.send("That ain't a word in my dictionary.")
        }, 3000);
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


        if (command == "nextper") {
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

async function handleVideoQuery(message, query) {
    var songQuery = query;
    var songID;
    if (songQuery.slice(0, 32) == "https://www.youtube.com/watch?v=") {
        songID = songQuery.slice(32, 43);
    }
    else if (songQuery.slice(0, 17) == "https://youtu.be/") {
        songID = songQuery.slice(17, 28);
    }
    else {
        songID = await searchForVideo(songQuery);
    }   
        playSong(message, songID);
}

async function playSong(message, song) {
    try {
        var songInfo = await ytdl.getInfo(song);
    }
    catch (error) {
        console.log(error);
        if (error.statusCode == 410) {
            message.channel.send("Your video is classified as age-restricted, unfortanately, I cannot play these videos ):")
            return
        }
        message.channel.send("Your video returned an error.  This could be because it is unplayable by YTDL, or I fucked up in my code, in either case, try a different video cause Im not getting around to fixing it.")
        return
    }
    
    var embed = {
        color: 0xffffff,
        title: "Song Info",
        fields: [
            {
                name: 'Title',
                value: songInfo.videoDetails.title
            },
            {
                name: 'Author',
                value: songInfo.videoDetails.author.name
            },
            {
                name: 'View Count',
                value: songInfo.videoDetails.viewCount,
            },
            {
                name: 'URL',
                value: songInfo.videoDetails.video_url,
            },
            {
                name: 'Likes',
                value: songInfo.videoDetails.likes + " Likes, and " + songInfo.videoDetails.dislikes + " Dislikes",
            },
        ],
    };
    message.channel.send({ embed: embed });
    message.member.voice.channel.join().then((connection) => 
        {
            connection.play(ytdl(songInfo.videoDetails.video_url));
                songTimeout = setTimeout(() => {
                    nextSong(message);

                    if (songQueue.length == 0) {
                            songQueue.shift;
                            message.guild.voice.channel.leave();
                            message.channel.send("You've run out of songs in your queue, imma head out.")
                        }
            },  songInfo.videoDetails.lengthSeconds * 1000);
    }
    )
}

async function sendQueueToChannel(message) {
    message.channel.send(songQueue.toString());

    var queueEmbed = new Discord.MessageEmbed();
    queueEmbed.setTitle("Queue");
    for (var i = 0; i > songQueue.length; i++ ) {
        if (songQueue[i].slice(0, 32) == "https://www.youtube.com/watch?v=") {
            var songInfo = await ytdl.getInfo(songQueue[i].slice(32, 43));
            var songTitle = songInfo.videoDetails.title;
        }
        else if (songQueue[i].slice(0, 17) == "https://youtu.be/") {
            var songInfo = await ytdl.getInfo(songQueue[i].slice(17, 28));
            var songTitle = songInfo.videoDetails.title;
        }
        else {
            var songTitle = await youtube.searchVideos(songQueue[i]).title;
        }   
        console.log(songTitle);
        queueEmbed.addField(i, songTitle);
    }
    message.channel.send({embed: queueEmbed});
}

async function searchForVideo(query) {
    var searchResult = await youtube.searchVideos(query);
    return searchResult.id;
}

function nextSong(message) {
    console.log(songQueue)
    songQueue.shift();
    var nextSong = songQueue[0];
    console.log(nextSong)
    console.log(songQueue);
    handleVideoQuery(message, nextSong);
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


function sendPingMessage(recipent, times, channel, message) {
    if(pingLoopNum < times) {
        channel.send("Hey, "+recipent.toString()+message);
        pingLoopNum++;
        pingTimeout = setTimeout(() => {
            sendPingMessage(recipent, times, channel, message);
        }, 2500, recipent, times, channel, message);
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


function collateArray(args) {
    var collatedArray; 
    for (i=0; i < args.length ; i++) {
        if (i == 0) {
            collatedArray = args[i]
        }
        else {
            collatedArray = collatedArray + " " + args[i];
        }
    }
    console.log(collatedArray);
    return collatedArray
}

function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}

client.login(TOKEN);
console.log(`Logged in as `+TOKEN)