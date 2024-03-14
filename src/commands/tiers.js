const { MessageEmbed  } = require('discord.js');
const config = require('../configs/config.json');


const Discord = require('discord.js');

module.exports = {
  conf: {
    aliases: ['royals', 'powerup'],
    name: 'Royals',
    help: 'royals Rol denetimi ve düzenlemesi yapar.',
    enabled: true,
    slash: false,
  },

  run: async ({ client, message, args }) => {
        // Yalnızca yönetici iznine sahip kullanıcıları kontrol et
        if (!message.member.permissions.has("ADMINISTRATOR")) {
          return message.reply("Bu komutu kullanmak için yönetici iznine sahip olmalısınız.");
      }

    const tierRoles = { 
      tier1RoleId: config.royals1, // Tier 1 rolünün ID'si
      tier2RoleId: config.royals2, // Tier 2 rolünün ID'si
      tier3RoleId: config.royals3, // Tier 3 rolünün ID'si
    }
    
    // Eğer kişi birilerini etiketlemediyse
    if (!message.mentions.users.size) {
      // Tier 1 rolünü al ve üye sayısını göster
      const tier1Role = message.guild.roles.cache.get(tierRoles.tier1RoleId);
      const tier1Members = tier1Role ? tier1Role.members.size : 0;

      // Tier 2 rolünü al ve üye sayısını göster
      const tier2Role = message.guild.roles.cache.get(tierRoles.tier2RoleId);
      const tier2Members = tier2Role ? tier2Role.members.size : 0;

      // Tier 3 rolünü al ve üye sayısını göster
      const tier3Role = message.guild.roles.cache.get(tierRoles.tier3RoleId);
      const tier3Members = tier3Role ? tier3Role.members.size : 0;

      // Tier'ları ve üye sayılarını mesajla gönder
      const embed = new MessageEmbed()
        .setTitle(`West Side Royals`)
        .setDescription('Rolde ki kişi sayıları aşağıda verilmiştir\n*Rolü birine vermek için .royals @etiket şeklinde kullanın.*')
        .setThumbnail('https://cdn.discordapp.com/attachments/1201297338442989721/1217107999747735672/Eagle.png?ex=6602d327&is=65f05e27&hm=b30436d878411e3898f056ea9427302e6208d462e0ff06a61f22094d770ee6a8&')
        .setColor('RED')
        .addFields([
          { name: '<:chall:1217232763963445248> Royals I', value: tier1Members.toString(), inline: true },
          { name: '<:master:1217232762117951690> Royals II', value: tier2Members.toString(), inline: true },
          { name: '<:gm:1217232760486236220> Royals III', value: tier3Members.toString(), inline: true },
        ]);
      message.channel.send({ embeds: [embed] });

    } else {
      // Etiketlenen kişiyi al
      const taggedUser = message.mentions.users.first();
      // Seçilen tier'ı al
      const selectedTier = args[1];

      // Tier rolünü al
      let tierRole;

      // Seçilen tier'a göre rol belirle
      switch (selectedTier) {
        case ('1', 'Royals1'):
          tierRole = message.guild.roles.cache.find(role => role.id === tierRoles.tier1RoleId);
          break;
        case ('2', 'Royals2'):
          tierRole = message.guild.roles.cache.find(role => role.id === tierRoles.tier2RoleId);
          break;
        case ('3', 'Royals3'):
          tierRole = message.guild.roles.cache.find(role => role.id === tierRoles.tier3RoleId);
          break;
        default:
          return message.channel.send('Geçersiz tier seçimi. Lütfen `Royals1`, `Royals2` veya `Royals3` olarak belirtin.');
      }

        // // Rol ismini kullanarak rol ID'sini bul
        // const role = message.guild.roles.cache.find(role => role.name === selectedTier);
        // // Eğer role bulunamazsa, roleID değeri null olacak
        // const roleID = role ? role.id : null;

      const embed2 = new MessageEmbed()
        .setTitle(`West Side Royals`)
        .setDescription(`<:kadoperson:1217111601912615033> **${taggedUser.username}** Kullanıcısına başarıyla rol verildi.`)
        .setThumbnail('https://cdn.discordapp.com/attachments/1201297338442989721/1217107999747735672/Eagle.png?ex=6602d327&is=65f05e27&hm=b30436d878411e3898f056ea9427302e6208d462e0ff06a61f22094d770ee6a8&')
        .setColor('GREEN');

      // Etiketlenen kişiye belirlenen tier rolünü ver
      const member = message.guild.members.cache.get(taggedUser.id);
      member.roles.add(tierRole)
        .then(() => message.channel.send({ embeds: [embed2] }))
        .catch(error => {
          console.error('Tier rolü verme hatası:', error);
          message.channel.send('Bir hata oluştu. Lütfen tekrar deneyin.');
        });
    }
  },
};
