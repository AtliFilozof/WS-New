const { Client, Collection, Intents } = require("discord.js");
const cron = require('node-cron');
const adminUserIds = ['981501891030700082', '816266228792295447']; // Geri verebilecek kişilerin Discord kullanıcı ID'leri
const targetChannelId = '1201297338442989721';
const targetRoleId = '1109126618775027762';
const client = (global.client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.MESSAGE_CONTENT,
    Intents.FLAGS.GUILD_PRESENCES
	]
}));
const settings = require("./configs/settings.json");
const { Database } = require("ark.db");
global.confdb = new Database("./configs/config.json");
client.commands = new Collection();
client.cooldown = new Map();
const discordModals = require("discord-modals");
discordModals(client);
require("./util/helpers/eventHandler");
require("./util/helpers/mongoHandler");

client.on("ready", () => {
	require("./util/helpers/commandHandler");
	require("./util/util")(client);
});

client.on('message', async (message) => {
	if (message.content === '!reboot') {
	  message.channel.send('Yeniden başlatılıyor...').then(() => {
		client.destroy();
		client.login(settings.token);
	  });
	}
  });

//   const { MessageActionRow, MessageSelectMenu } = require('discord.js');


//   client.on('messageCreate', async (message) => {
//     if (message.content === '!rolemenu') {
//         const rolesMenu = new MessageActionRow()
//             .addComponents(
//                 new MessageSelectMenu()
//                     .setCustomId('rolemenu')
//                     .setPlaceholder('Rol Seçim')
//                     .addOptions([
//                         {
//                             label: 'Minecraft',
//                             description: 'Minecraft kanallarını görmenizi sağlar.',
//                             value: 'Minecraft',
// 							emoji: `1140966237044740096`
//                         },
//                         {
//                             label: 'GIF',
//                             description: 'PP/GIF Kanallarını görmenizi sağlar.',
//                             value: 'Gif',
// 							emoji: `1140968803988164648`
//                         },
//                     ]),
//             );

//         await message.reply({ content: 'Lütfen aşağıdan size uygun rolleri seçin: \n*Seçtiğiniz rolleri tekrar seçerseniz rolleriniz üstünüzden kalkar **kalkar**.*', components: [rolesMenu] });
// 				}
// 			});

const allowedRole = '1109097221682626680'; // Yönetici rol ID'si

client.on('message', (message) => {
  // Küfür kontrolü sadece belirli bir kanalda yapılacaksa:
  if (message.channel.id === '1193525487226593300') {
    // Küfür kontrolü
    const küfürler = ['amk', 'aq', 'orospu', 'oç', 'ananı' , 'sikim', 'skm', 'piç' , 'salak', 'aptal', 'gerizekalı' , 'amına', 'göt', 'sikerim' , 'siktim', 'sex', 'seks','sikmiyim','nafsım','gıylarım','kününü','koyim','emir','bacını','amcını','anayın','sikm','sikim','skim','skm','s1k1y1m','s1kym','sk1ym','s1k1ym','sik1y1m','sıkıyim','sikiyım','sikyım','izelinin','bujisini','amxığını','amcığını','yarrrak','yarak']; // İstediğiniz küfürleri ekleyin

if (küfürler.some(küfür => message.content.toLowerCase().includes(küfür))) {
  // Küfür tespit edildi
  message.delete(); // Mesajı sil
  message.channel.send(' <:WESTSDE:1035901494744064030> *Lütfen küfürlü ifadeler kullanma!*'); // Kullanıcıya uyarı mesajı gönder
  message.author.send('chatte güzellikle uyardım bi daha yaparsan ananı götünden sikerim :wink:'); // Kullanıcıya uyarı mesajı gönder
}
  else {
  console.log("mesaj gönderemedim") // Başarısız olan rolleri listeye ekl
}  
}

  // Diğer botların mesajlarını kontrol etmeyin
  if (message.author.bot) return;

  // Kullanıcının yönetici izinlerini ve belirli bir role sahip olup olmadığını kontrol et
  if (
    !message.guild ||
    (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has(allowedRole))
  ) {
    console.error(`Hata: Yönetici izni yok! Kullanıcı: ${message.author.tag}, İçerik: ${message.content}`);
    return;
  }
  
    // Diğer komutlar buraya eklenebilir
  });

    // Her gün saat 22.00'de görevi başlat
    cron.schedule('0 22 * * *', () => {
        try {
          const guild = client.guilds.cache.get('924196626040516628'); // Sunucu ID'sini girin
          const admins = guild.members.cache.filter(member => adminUserIds.includes(member.user.id));
    
          if (admins.size === 0) {
            console.log('Geri verebilecek kişi bulunamadı.');
            return;
          }
    
          // Botun rolünü topla
          const botRole = guild.roles.cache.find(role => role.name === 'BOT_ROLÜ_ADİ'); // Botun aldığı rol adını girin
          guild.members.cache.filter(member => member.roles.cache.has(botRole.id)).forEach(async (member) => {
            await member.roles.remove(botRole);
          });
    
          console.log('Bot rolleri toplandı.');
    
          // Belirli kişilere geri verme mesajını gönder
          admins.forEach(admin => {
            admin.user.send(`Bot rolleri başarıyla toplandı. Rollerinizi geri almak için !rolleriver komutunu kullanabilirsiniz.`);
          });
    
          console.log('Geri verebilecek kişilere bilgilendirme mesajı gönderildi.');
        } catch (error) {
          console.error('Bir hata oluştu:', error);
        }
      });

// client.on('interactionCreate', async (interaction) => {
//     if (!interaction.isSelectMenu()) return;

//     const selectedRoles = interaction.values;

//     // Get the member who interacted
//     const member = interaction.member;

//     // Loop through selected roles and add/remove them
//     selectedRoles.forEach(async (selectedRole) => {
//         const role = interaction.guild.roles.cache.find((role) => role.name === selectedRole);

//         if (role) {
//             if (member.roles.cache.some((existingRole) => existingRole.name === selectedRole)) {
//                 await member.roles.remove(role);
//             } else {
//                 await member.roles.add(role);
//             }
//         }
//     });

//     await interaction.reply({ content: 'Rollerin güncellendi!', ephemeral: true });
// });
const { MessageAttachment } = require('discord.js'); // MessageAttachment'ı doğrudan almak için bu satırı ekledik

const starboardChannelId = '1214725876533428335'; // Starboard kanalının ID'sini buraya ekleyin
const starboardImageURL = 'https://cdn.discordapp.com/attachments/1193525487226593300/1214729660752203796/dash_20240305_173757.png?ex=65fa2c27&is=65e7b727&hm=011cb998ef1de7464853e580a673f896f7c42946baee1b2a53611d880c996dc4'; // Starboard embedlerinde kullanılacak fotoğraf URL'si

client.on('messageReactionAdd', async (reaction, user) => {
  // Yıldız emojisine (⭐) basıldığında işlem yap
  if (reaction.emoji.name === '⭐' && !user.bot) {
    const message = reaction.message;

    // Starboard kanalını al
    const starboardChannel = message.guild.channels.cache.get(starboardChannelId);

    // Yıldızlanan mesajı starboard'a gönder
    if (starboardChannel) {
      const files = message.attachments.map(attachment => new MessageAttachment(attachment.url));
      const embed = {
        color: 0xFFD700, // Altın rengi (isteğe bağlı)
        author: {
          name: message.author.username,
          icon_url: message.author.displayAvatarURL({ dynamic: true }),
        },
        description: message.content,
        fields: [
          {
            name: 'ㅤ',
            value: `ㅤ`,
          },
          {
            name: 'ㅤ',
            value: `[Mesaja gitmek için tıkla](${message.url})`,
          },
        ],
        timestamp: new Date(),
        footer: {
          text: `#${message.channel.name}`,
          url: message.url
        },
        thumbnail: {
          url: starboardImageURL,
        },
      };

      // Eğer mesajda ekli dosya varsa, embed'e ekle
      if (files.length > 0) {
        embed.files = files;
      }

      await starboardChannel.send({ embeds: [embed] });
    }
  }
});


const canvacord = require("canvacord");

client.on('messageCreate', async message => {
  // Kanalın ID'sini belirtin
  const targetChannelId = '1193525487226593300'; // Kanal_ID kısmını kendi kanalınızın ID'siyle değiştirin

  // Sadece belirli kanalda çalışmasını sağlayın
  if (message.channel.id !== targetChannelId) {
    return;
  }

  // Belirtilen yüzde 5 olasılıkla kontrol
  if (Math.random() <= 0.5) {
    try {
      const member = message.author;
      let avatar = member.displayAvatarURL({
        dynamic: false,
        format: "png",
      });

      const embed = {
        description: ('Loading..'),
        timestamp: new Date(),


      }
      let messages = await message.channel.send(embed);

      let image = await canvacord.Canvas.trigger(avatar);
      let attachment = new Discord.MessageAttachment(image, "triggered.gif");
      return message.channel.send({ files: [attachment] }).then(messages.delete());
    } catch (error) {
      console.error('Trigger efekti hatası:', error);
      message.channel.send('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }
});


client
  .login(settings.token)
  .then(() => console.log("[BOT] Bot connected!"))
  .catch(() => console.log("[BOT] Bot can't connected!"));