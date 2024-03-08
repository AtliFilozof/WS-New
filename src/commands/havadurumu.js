const Discord = require('discord.js');
const weather = require('weather-js');

module.exports = {
  conf: {
    aliases: ['havadurumu'],
    name: 'havadurumu',
    help: 'havadurumunu gösterir.',
    enabled: true,
    slash: false, // Prefix ile kullanılacak
  },

  run: async ({ client, message, args }) => {
    weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {
      if (result === undefined || result.length === 0) {
        return message.channel.send('🚫 **Lokasyon/Bölge Bulunamadı...**');
      }

      var current = result[0].current;
      var location = result[0].location;

      const embed = new Discord.MessageEmbed()
        .setTitle(`${current.observationpoint} Hava Durumu`)
        .setDescription(`**${current.skytext}**`)
        .setThumbnail(current.imageUrl)
        .setColor('BLUE') // Renk ismini doğrudan kullan
        .addFields([
          { name: '⏳ Zaman Dilimi:', value: `UTC${location.timezone}`, inline: true },
          { name: '🎰 Derece Tipi:', value: location.degreetype, inline: true },
          { name: '🌞 Sıcaklık:', value: `${current.temperature} Derece`, inline: true },
          { name: '🌅 Hissedilen Sıcaklık: ', value: `${current.feelslike} Derece`, inline: true },
          { name: '🌈 Rüzgar Oranı:', value: current.winddisplay, inline: true },
          { name: '🌁 Nem Oranı:', value: `${current.humidity}%`, inline: true }
        ]);

      message.channel.send({ embeds: [embed] });
    });
  }
};
