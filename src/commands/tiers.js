const { MessageEmbed } = require('discord.js');

module.exports = {
  conf: {
    aliases: ['tier', 'tiers'],
    name: 'tierler',
    help: 'royals Tierlere göre rol sayılarını ve kişileri gösterir.',
    enabled: true,
    slash: false,
  },

  run: async ({ client, message, args }) => {
      const tierRoles = {
        tier1: '1109136491621396551', // Tier 1 rolünün ID'si
        tier2: '1109145157913288826', // Tier 2 rolünün ID'si
        tier3: '1109145299005480961', // Tier 3 rolünün ID'si
      }
      
    // Eğer kişi birilerini etiketlemediyse
    if (!message.mentions.users.size) {
      // Tier 1 rolünü al ve üye sayısını göster
      const tier1Role = message.guild.roles.cache.get(tier1RoleId);
      const tier1Members = tier1Role ? tier1Role.members.size : 0;

      // Tier 2 rolünü al ve üye sayısını göster
      const tier2Role = message.guild.roles.cache.get(tier2RoleId);
      const tier2Members = tier2Role ? tier2Role.members.size : 0;

      // Tier 3 rolünü al ve üye sayısını göster
      const tier3Role = message.guild.roles.cache.get(tier3RoleId);
      const tier3Members = tier3Role ? tier3Role.members.size : 0;

      // Tier'ları ve üye sayılarını mesajla gönder
      message.channel.send(`Tier 1: ${tier1Members} üye\nTier 2: ${tier2Members} üye\nTier 3: ${tier3Members} üye`);
    } else {
      // Etiketlenen kişiyi al
      const taggedUser = message.mentions.users.first();
      // Seçilen tier'ı al
      const selectedTier = args[1];

      // Tier rolünü al
      let tierRole;

      // Seçilen tier'a göre rol belirle
      switch (selectedTier) {
        case 'Tier1':
          tierRole = message.guild.roles.cache.find(role => role.id === tier1RoleId);
          break;
        case 'Tier2':
          tierRole = message.guild.roles.cache.find(role => role.id === tier2RoleId);
          break;
        case 'Tier3':
          tierRole = message.guild.roles.cache.find(role => role.id === tier3RoleId);
          break;
        default:
          return message.channel.send('Geçersiz tier seçimi. Lütfen Tier1, Tier2 veya Tier3 olarak belirtin.');
      }

      // Etiketlenen kişiye belirlenen tier rolünü ver
      const member = message.guild.members.cache.get(taggedUser.id);
      member.roles.add(tierRole)
        .then(() => message.channel.send(`${taggedUser.username} kullanıcısına ${selectedTier} rolü verildi.`))
        .catch(error => {
          console.error('Tier rolü verme hatası:', error);
          message.channel.send('Bir hata oluştu. Lütfen tekrar deneyin.');
        });
    }
  },
};
