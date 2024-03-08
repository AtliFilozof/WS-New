const Discord = require("discord.js")
const Canvas = require("canvas");

module.exports = {
conf: {
aliases: ['spotify'],
name: 'spotify',
help: 'Spotify Kart',
enabled: true,
slash: false, // Prefix ile kullanılacak
},

run: async ({ client, message, args }) => {


////////////////////////////////////////////////////////////////////////////////////////////////
const panel = {
    image_width: 750// OLUŞTURULAN RESİMİN GENİŞLİĞİNİ AYARLARSINIZ YÜKSEKLİK OTOMATİK AYARLANIR.
}
////////////////////////////////////////////////////////////////////////////////////////////////
if (message.channel.type === "dm") return;
let discordUser = message.mentions.users.first() || client.users.cache.get(args.join(" ")) || message.author,
    discordUserID = message.mentions.users.first() || client.users.cache.get(args.join(" ")),
    authorImage = "https://cdn.discordapp.com/attachments/927949573413011466/935834500003401748/Spotify_logo_without_text.svg.png"
    if (args[0]) {
        if (!discordUserID) {
            const embed = new Discord.MessageEmbed()
            .setAuthor({name:"Spotify",iconURL:authorImage})
            .setDescription(`Bu sunucuda "${args.join(" ")}" adlı / id'li bir kullanıcı bulamadım.`)
            .setColor("#18191c")
            return message.channel.send({
                embeds: [embed]
            })
        }
    }
    if (discordUser.bot) {
        const embed = new Discord.MessageEmbed()
        .setAuthor({name:"Spotify",iconURL:authorImage})
        .setDescription("Bu komut discord botları üzerinde çalıştırılamaz.")
        .setColor("#18191c")
        return message.channel.send({
            embeds: [embed]
        })
    }
        try {
            userPresenceStatus = message.guild.members.cache.get(discordUser.id).presence.status.toString()
        } catch {
            const embed = new Discord.MessageEmbed()
            .setAuthor({name:"Spotify",iconURL:authorImage})
            .setDescription("Belirtilen kullanıcı şuanda çevrimdışı durumda.")
            .setColor("#18191c")
            return message.channel.send({
                embeds: [embed]
            })
        }
    if (message.guild.members.cache.get(discordUser.id).presence.activities.length === 0) {
        const embed = new Discord.MessageEmbed()
        .setAuthor({name:"Spotify",iconURL:authorImage})
        .setDescription("Belirtilen kullanıcı şuanda spotify dinlemiyor.")
            .setColor("#18191c")
            return message.channel.send({
                embeds: [embed]
            })
    }
var controlActivity = message.guild.members.cache.get(discordUser.id).presence.activities.filter(function(spotifyActivity) {
    if (spotifyActivity.id === 'spotify:1') {
        return true;
    }
})
if (controlActivity.length === 0) {
    const embed = new Discord.MessageEmbed()
    .setAuthor({name:"Spotify",iconURL:authorImage})
    .setDescription("Belirtilen kullanıcı şuanda spotify dinlemiyor.")
    .setColor("#18191c")
    return message.channel.send({
        embeds: [embed]
    })
}

//FUNCTIONS
function convertTime(second) {
    var sec_num = parseInt(second, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (seconds < 10) {seconds = "0"+seconds;}
        if (hours === 0) {
            return minutes + ':' + seconds
        }
    return hours + ':' + minutes + ':' + seconds
}
function proportionalPicture(width,image_natural_width,image_natural_height) {
    let process, conclusion;
    process = width/image_natural_width
    conclusion = image_natural_height*process
    return conclusion;
}
function metricText(ctx, text, maxWidth) {
    var key, keyMetrics
        keyMetrics = ctx.measureText(text);
        key = text;
    if (keyMetrics.width < maxWidth || keyMetrics.width === maxWidth) return key;
    while (keyMetrics.width > maxWidth) {
        key = key.substr(0, key.length - 1).trim()
        keyMetrics = ctx.measureText(key)
    }
    return key+"..."
}  
function getWrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' '),
        line = '',
        lineCount = 0,
        i,
        test,
        metrics,
        heightData = 0,
        arr=[];
    for (i = 0; i < words.length; i++) {
        test = words[i];
        metrics = ctx.measureText(test);
        while (metrics.width > maxWidth) {
            test = test.substring(0, test.length - 1);
            metrics = ctx.measureText(test);
        }
        if (words[i] != test) {
            words.splice(i + 1, 0,  words[i].substr(test.length))
            words[i] = test;
        }  
        test = line + words[i] + ' ';  
        metrics = ctx.measureText(test);
        if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(line , x, y);
            arr.push(line)
            heightData += ctx.measureText(line).actualBoundingBoxAscent;
            line = words[i] + ' ';
            y += ctx.measureText(line).actualBoundingBoxAscent+lineHeight;
            lineCount++;
        }
        else {
            line = test;
        }
    }       
    heightData += ctx.measureText(line).actualBoundingBoxAscent;
    arr.push(line)
    ctx.fillText(line, x, y);
    return {
        totalHeight: heightData+(lineHeight*(lineCount)),
        firstHeight: ctx.measureText(arr[0]).actualBoundingBoxAscent,
        finalHeight: ctx.measureText(arr[arr.length-1]).actualBoundingBoxAscent,
        nextCordinate: y+ctx.measureText(arr[arr.length-1]).actualBoundingBoxAscent
    }
}

// SETTINGS
var presence = controlActivity[0],
    name = presence.details.replace(/Ş/g, "S").replace(/ş/g, "s").replace(/Ç/g, "C").replace(/ç/g, "c").replace(/ı/g, "i").replace(/İ/g, "I").replace(/Ü/g, "U").replace(/ü/g, "u").replace(/Ğ/g, "G").replace(/ğ/g, "g").replace(/Ö/g, "O").replace(/ö/g, "o"),
    state = presence.state.replace(/;/g, ",").replace(/Ş/g, "S").replace(/ş/g, "s").replace(/Ç/g, "C").replace(/ç/g, "c").replace(/ı/g, "i").replace(/İ/g, "I").replace(/Ü/g, "U").replace(/ü/g, "u").replace(/Ğ/g, "G").replace(/ğ/g, "g").replace(/Ö/g, "O").replace(/ö/g, "o"),
    platform = presence.name,
    album = presence.assets.largeText.replace(/Ş/g, "S").replace(/ş/g, "s").replace(/Ç/g, "C").replace(/ç/g, "c").replace(/ı/g, "i").replace(/İ/g, "I").replace(/Ü/g, "U").replace(/ü/g, "u").replace(/Ğ/g, "G").replace(/ğ/g, "g").replace(/Ö/g, "O").replace(/ö/g, "o"),
    start = (presence.timestamps.end - presence.timestamps.start) / 1000,
    current = (Date.now() - presence.timestamps.start) / 1000,
    image = `https://i.scdn.co/image/${presence.assets.largeImage.slice(8)}`,
    trackURL = `https://open.spotify.com/track/${presence.syncId}`

var canvasSettings = {
    img: image,
    name: name,
    duration: start,
    current: current,
    author: state,
    platform: platform,
    album: album,
    buttons: message.author.id === discordUser.id ? false : true,
    width: panel.image_width
},
a = canvasSettings.width-361,
b = proportionalPicture(canvasSettings.width, 361, 222)-222,
c = canvasSettings.width/361

//FONT REGISTER
Canvas.registerFont("./fonts/inter/Inter-Bold.ttf", { family: "interbold" })
Canvas.registerFont("./fonts/whitney/whitneymedium.otf", { family: "whitneymedium" })
Canvas.registerFont("./fonts/whitney/whitneysemibold.otf", { family: "whitneysemibold" })
// START MESSAGE TYPING
message.channel.sendTyping()
//LOAD IMAGE
var Thumbnail = await Canvas.loadImage(canvasSettings.img)
//CREATE
var canvas = Canvas.createCanvas(361+a, 222+b)
var ctx = canvas.getContext('2d', {
    alpha: true
})
//SCALE
ctx.save()
ctx.scale(c,c)
//BACKGROUND
ctx.fillStyle = "#18191c";
ctx.beginPath()
ctx.moveTo(7, 0);
ctx.arcTo(361, 0, 361, 222, 7);
ctx.arcTo(361, 222, 0, 222, 7);
ctx.arcTo(0, 222, 0, 0, 7);
ctx.arcTo(0, 0, 361, 0, 7);
ctx.closePath();
ctx.fill()
ctx.fillStyle = "#cacbcd"
ctx.font = "17.07px 'whitneymedium'"
let amount = 8
ctx.globalAlpha = 0;
var musicAuthors_1 = getWrapText(ctx, canvasSettings.author+" tarafından", 102, 81, 244, amount)
ctx.globalAlpha = 1;
if ((musicAuthors_1.nextCordinate+amount)*c > 114*c) {
    ctx.canvas.height = ctx.canvas.height+((musicAuthors_1.nextCordinate+amount)*c - 114*c)
    ctx.fillStyle = "#18191c";
    ctx.beginPath();
    ctx.moveTo(0 + 7*c, 0);
    ctx.arcTo(0 + ctx.canvas.width, 0, 0 + ctx.canvas.width, 0 + ctx.canvas.height, 7*c);
    ctx.arcTo(0 + ctx.canvas.width, 0 + ctx.canvas.height, 0, 0 + ctx.canvas.height, 7*c);
    ctx.arcTo(0, 0 + ctx.canvas.height, 0, 0, 7*c);
    ctx.arcTo(0, 0, 0 + ctx.canvas.width, 0, 7*c);
    ctx.closePath();
    ctx.fill();
    ctx.scale(c,c)
}
ctx.fillStyle = "#f0f0f0";
ctx.textAlign = "left";
ctx.font = "17.07px 'interbold'"
ctx.fillText(metricText(ctx, canvasSettings.name.toString(), 229), 102, 59)
ctx.fillStyle = "#cacbcd"
ctx.font = "17.07px 'whitneymedium'"
var musicAuthors = getWrapText(ctx, canvasSettings.author+" tarafından", 102, 59+musicAuthors_1.firstHeight+amount, 244, amount)
ctx.fillText(metricText(ctx, canvasSettings.album+" albümünde", 229), 102, musicAuthors.nextCordinate+amount)
ctx.fillStyle = "#b9bbbe";
ctx.font = "16px interbold"
ctx.fillText("SPOTİFY DİNLİYOR", 13, 23)
//LOGO
ctx.save();
ctx.fillStyle="#1ED760";
ctx.beginPath();
ctx.moveTo(333,11);
ctx.bezierCurveTo(325.82,11,320,16.82,320,24);
ctx.bezierCurveTo(320,31.18,325.82,37,333,37);
ctx.bezierCurveTo(340.18,37,346,31.18,346,24);
ctx.bezierCurveTo(346,20.55,344.63,17.25,342.19,14.81);
ctx.bezierCurveTo(339.75,12.37,336.45,11,333,11);
ctx.closePath();
ctx.moveTo(338.93,29.77);
ctx.bezierCurveTo(338.69,30.13,338.22,30.259999999999998,337.83,30.05);
ctx.bezierCurveTo(334.78,28.18,330.91999999999996,27.78,326.40999999999997,28.79);
ctx.bezierCurveTo(326.13,28.86,325.83,28.759999999999998,325.63,28.55);
ctx.bezierCurveTo(325.43,28.34,325.36,28.04,325.45,27.76);
ctx.bezierCurveTo(325.53,27.48,325.76,27.270000000000003,326.03999999999996,27.21);
ctx.bezierCurveTo(330.99999999999994,26.07,335.21999999999997,26.560000000000002,338.66999999999996,28.67);
ctx.bezierCurveTo(338.84999999999997,28.78,338.97999999999996,28.96,339.03,29.17);
ctx.bezierCurveTo(339.09,29.38,339.05,29.59,338.93,29.77);
ctx.closePath();
ctx.moveTo(340.56,26.19);
ctx.bezierCurveTo(340.42,26.42,340.2,26.580000000000002,339.94,26.64);
ctx.bezierCurveTo(339.68,26.7,339.41,26.66,339.18,26.51);
ctx.bezierCurveTo(335.69,24.360000000000003,330.36,23.75,326.22,25.01);
ctx.bezierCurveTo(325.87,25.110000000000003,325.5,25.020000000000003,325.23,24.770000000000003);
ctx.bezierCurveTo(324.96000000000004,24.520000000000003,324.86,24.150000000000002,324.95000000000005,23.790000000000003);
ctx.bezierCurveTo(325.04,23.44,325.30000000000007,23.160000000000004,325.65000000000003,23.060000000000002);
ctx.bezierCurveTo(330.36,21.64,336.25000000000006,22.330000000000002,340.23,24.810000000000002);
ctx.bezierCurveTo(340.69,25.11,340.83,25.72,340.56,26.19);
ctx.closePath();
ctx.moveTo(340.68,22.54);
ctx.bezierCurveTo(336.5,20.06,329.59000000000003,19.82,325.57,21.04);
ctx.bezierCurveTo(324.96999999999997,21.14,324.38,20.77,324.21,20.18);
ctx.bezierCurveTo(324.03999999999996,19.59,324.32,18.97,324.88,18.72);
ctx.bezierCurveTo(329.46999999999997,17.34,337.11,17.58,341.94,20.47);
ctx.bezierCurveTo(342.21999999999997,20.63,342.42,20.9,342.5,21.22);
ctx.bezierCurveTo(342.58,21.529999999999998,342.52,21.869999999999997,342.35,22.14);
ctx.bezierCurveTo(341.98,22.68,341.25,22.85,340.68,22.54);
ctx.closePath();
ctx.fill();
ctx.restore();
//THUMB & TEXTS
ctx.save();
ctx.beginPath()
ctx.moveTo(21, 39);
ctx.arcTo(88, 39, 88, 114, 8);
ctx.arcTo(88, 114, 13, 114, 8);
ctx.arcTo(13, 114, 13, 39, 8);
ctx.arcTo(13, 39, 88, 39, 8);
ctx.clip();
ctx.closePath();
ctx.drawImage(Thumbnail, 13, 39, 75, 75)//244
ctx.restore();
if ((musicAuthors.nextCordinate+amount)*c > 114*c) {
    ctx.save();
    ctx.transform(1,0,0,1,0,(musicAuthors.nextCordinate+amount) - 114)
}
//BUTTONS
ctx.fillStyle = `${canvasSettings.buttons ? "#4f545c" : "#33363c"}`;
ctx.beginPath()
ctx.moveTo(17, 169);
ctx.arcTo(298, 169, 298, 209, 4);
ctx.arcTo(298, 209, 13, 209, 4);
ctx.arcTo(13, 209, 13, 169, 4);
ctx.arcTo(13, 169, 298, 169, 4);
ctx.closePath();
ctx.fill()
ctx.beginPath()
ctx.moveTo(312, 169);
ctx.arcTo(348, 169, 348, 209, 4);
ctx.arcTo(348, 209, 308, 209, 4);
ctx.arcTo(308, 209, 308, 169, 4);
ctx.arcTo(308, 169, 348, 169, 4);
ctx.closePath();
ctx.fill()
ctx.fillStyle = `${canvasSettings.buttons ? "#FFFFFF" : "#8b8c8d"}`;
ctx.textAlign = "left";
ctx.font = "17.07px 'whitneysemibold'"
ctx.fillText("Spotify üzerinde oynat", 88, 194)
ctx.save();
ctx.fillStyle=`${canvasSettings.buttons ? "#FFFFFF" : "#8b8c8d"}`;
ctx.beginPath();
ctx.moveTo(68,179);
ctx.bezierCurveTo(62.480000000000004,179,58,183.48,58,189);
ctx.bezierCurveTo(58,194.52,62.480000000000004,199,68,199);
ctx.bezierCurveTo(73.52,199,78,194.52,78,189);
ctx.bezierCurveTo(78,186.35,76.95,183.8,75.07,181.93);
ctx.bezierCurveTo(73.2,180.05,70.65,179,68,179);
ctx.closePath();
ctx.moveTo(72.56,193.44);
ctx.bezierCurveTo(72.38,193.72,72.01,193.81,71.72,193.66);
ctx.bezierCurveTo(69.38,192.22,66.41,191.91,62.94,192.69);
ctx.bezierCurveTo(62.72,192.74,62.489999999999995,192.67,62.339999999999996,192.51);
ctx.bezierCurveTo(62.19,192.35,62.129999999999995,192.10999999999999,62.199999999999996,191.89999999999998);
ctx.bezierCurveTo(62.269999999999996,191.68999999999997,62.44,191.51999999999998,62.66,191.46999999999997);
ctx.bezierCurveTo(66.47,190.58999999999997,69.72,190.96999999999997,72.38,192.59999999999997);
ctx.bezierCurveTo(72.52,192.67999999999998,72.61999999999999,192.81999999999996,72.64999999999999,192.97999999999996);
ctx.bezierCurveTo(72.68,193.13,72.65,193.3,72.56,193.44);
ctx.closePath();
ctx.moveTo(73.81,190.69);
ctx.bezierCurveTo(73.7,190.85999999999999,73.53,190.99,73.33,191.04);
ctx.bezierCurveTo(73.13,191.09,72.92,191.04999999999998,72.75,190.94);
ctx.bezierCurveTo(70.06,189.28,65.97,188.81,62.78,189.78);
ctx.bezierCurveTo(62.51,189.86,62.22,189.79,62.02,189.59);
ctx.bezierCurveTo(61.82,189.4,61.730000000000004,189.11,61.800000000000004,188.84);
ctx.bezierCurveTo(61.870000000000005,188.57,62.07000000000001,188.35,62.34,188.28);
ctx.bezierCurveTo(65.97,187.19,70.5,187.72,73.56,189.62);
ctx.bezierCurveTo(73.91,189.86,74.02,190.32,73.81,190.69);
ctx.closePath();
ctx.moveTo(73.91,187.88);
ctx.bezierCurveTo(70.69,185.97,65.38,185.79,62.29,186.72);
ctx.bezierCurveTo(61.83,186.79,61.38,186.51,61.24,186.06);
ctx.bezierCurveTo(61.11,185.61,61.330000000000005,185.13,61.75,184.94);
ctx.bezierCurveTo(65.28,183.88,71.16,184.06,74.88,186.28);
ctx.bezierCurveTo(75.08999999999999,186.41,75.25,186.61,75.31,186.85);
ctx.bezierCurveTo(75.37,187.09,75.33,187.35,75.2,187.56);
ctx.bezierCurveTo(74.91,187.98,74.35,188.12,73.91,187.88);
ctx.closePath();
ctx.fill();
ctx.beginPath();
ctx.moveTo(327.73,190.53);
ctx.bezierCurveTo(326.33000000000004,193.05,326.33000000000004,196.13,327.73,198.65);
ctx.lineTo(316,198.65);
ctx.lineTo(316,195.94);
ctx.bezierCurveTo(316,192.29,323.07,190.53,326.67,190.53);
ctx.lineTo(327.73,190.53);
ctx.closePath();
ctx.moveTo(326.67,187.82);
ctx.bezierCurveTo(323.74,187.82,321.34000000000003,185.38,321.34000000000003,182.41);
ctx.bezierCurveTo(321.34000000000003,179.44,323.74,177,326.67,177);
ctx.bezierCurveTo(329.6,177,332,179.44,332,182.41);
ctx.bezierCurveTo(332,185.38,329.6,187.82,326.67,187.82);
ctx.closePath();
ctx.moveTo(334.67,189.18);
ctx.bezierCurveTo(337.6,189.18,340,191.62,340,194.59);
ctx.bezierCurveTo(340,197.56,337.6,200,334.67,200);
ctx.bezierCurveTo(331.74,200,329.34000000000003,197.56,329.34000000000003,194.59);
ctx.bezierCurveTo(329.34000000000003,191.62,331.73,189.18,334.67,189.18);
ctx.closePath();
ctx.moveTo(333.33,197.56);
ctx.lineTo(337.33,194.58);
ctx.lineTo(333.33,191.60000000000002);
ctx.lineTo(333.33,197.56);
ctx.closePath();
ctx.fill();
//LOADER
ctx.save();
ctx.fillStyle = "#212326";
ctx.beginPath()
ctx.moveTo(15, 130);
ctx.arcTo(348, 130, 348, 134, 2);
ctx.arcTo(348, 134, 13, 134, 2);
ctx.arcTo(13, 134, 13, 130, 2);
ctx.arcTo(13, 130, 348, 130, 2);
ctx.closePath();
ctx.fill();
ctx.clip();
ctx.fillStyle = "#ffffff";
ctx.beginPath()
ctx.moveTo(11+335/canvasSettings.duration*canvasSettings.current, 130);
ctx.arcTo(13+335/canvasSettings.duration*canvasSettings.current, 130, 13+335/canvasSettings.duration*canvasSettings.current, 134, 2);
ctx.arcTo(13+335/canvasSettings.duration*canvasSettings.current, 134, 9+335/canvasSettings.duration*canvasSettings.current, 134, 2);
ctx.arcTo(9, 134, 9, 130, 2);
ctx.arcTo(9, 130, 13, 130, 2);
ctx.closePath();
ctx.fill()
ctx.restore();
ctx.fillStyle = "#d1d1d2";
ctx.textAlign = "left";
ctx.font = "14px 'whitneymedium'"
ctx.fillText(convertTime(canvasSettings.current), 13, 150)
ctx.textAlign = "right";
ctx.fillText(convertTime(canvasSettings.duration), 347, 150)
ctx.restore();
ctx.restore();
// SEND ATTACHMENT
var atc = new Discord.MessageAttachment(canvas.toBuffer(), "Discord-Spotify-Activities.png")
const embed = new Discord.MessageEmbed()
.setImage("attachment://Discord-Spotify-Activities.png")
.setColor("#18191c")
.setDescription(`Spotify üzerinde oynat; ${trackURL}`)
.setAuthor({name:discordUser.username+"#"+discordUser.discriminator+" tarafından dinleniliyor.",iconURL:authorImage, url:trackURL})
return message.channel.send({
    files: [atc],
    embeds: [embed]
})
}
};
