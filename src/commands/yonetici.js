const allowedUserIds = ['816266228792295447', '981501891030700082']; // Komutu kullanabilecek kişilerin Discord ID'leri
const Discord = require('discord.js');

module.exports = {
  conf: {
    aliases: ['yönetici'],
    name: 'yönetici',
    help: 'yönetici Sunucudaki belirli rollerin yönetici yetkilerini kapatır veya açar.',
    enabled: true,
    slash: false,
  },

  run: async ({ message, args }) => {
    // Komutu sadece belirli kişilerin kullanmasını sağlayın
    if (!allowedUserIds.includes(message.author.id)) {
      return message.channel.send('Bu komutu kullanma yetkiniz yok!');
    }

    try {
      const guild = message.guild;

      if (!args[0]) {
        return message.channel.send('Lütfen bir argüman belirtin: `kapat` veya `aç`.');
      }

      let durum = '';
      let basarisizRoller = [];

      let hedefRoller = [];

      if (args[0].toLowerCase() === 'kapat' || args[0].toLowerCase() === 'aç') {
        if (args.length < 2) {
          return message.channel.send('Lütfen açılacak rollerin ID\'lerini belirtin. Örnek Kullanım: `!yöneticidurum aç rolID1 rolID2 ...`');
        }

        hedefRoller = args.slice(1);
      } else {
        return message.channel.send('Geçersiz argüman. Lütfen `kapat` veya `aç` şeklinde belirtin.');
      }

      hedefRoller.forEach(async (rolID) => {
        const role = guild.roles.cache.get(rolID);

        if (!role) {
          basarisizRoller.push(`Geçersiz Rol ID: ${rolID}`);
          return;
        }

        try {
          const yeniYetkiler = args[0].toLowerCase() === 'kapat' ? [] : ['ADMINISTRATOR'];
          await role.setPermissions(yeniYetkiler); // Yönetici yetkilerini düzenle
        } catch (error) {
          basarisizRoller.push(role.name); // Başarısız olan rolleri listeye ekle
        }
      });

      durum = args[0].toLowerCase() === 'kapat' ? 'kapatıldı' : 'açıldı';

      if (basarisizRoller.length > 0) {
        const embed = new Discord.MessageEmbed()
          .setColor('#FF0000')
          .setTitle(`${args[0].toLowerCase() === 'kapat' ? 'Kapatma' : 'Açma'} Hatası`)
          .setDescription(`Aşağıdaki rollerin yönetici yetkileri ${args[0].toLowerCase() === 'kapat' ? 'kapatılamadı' : 'açılamadı'}:`)
          .addField('Başarısız Roller:', basarisizRoller.join('\n'));

        return message.channel.send(embed);
      }

      message.channel.send(`Belirtilen rollerin yönetici yetkileri ${durum}!`);
    } catch (error) {
      console.error('Bir hata oluştu:', error);
      const errorEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Bir Hata Oluştu')
        .setDescription('Komutun çalıştırılması sırasında bir hata oluştu. Lütfen botun yapılandırılmasını kontrol edin.');

      message.channel.send(errorEmbed);
    }
  },
};
