const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  conf: {
    aliases: ['lol'],
    name: 'lol',
    help: 'Belirtilen yama notlarının resimlerini gösterir.',
    enabled: true,
    slash: false,
  },

  run: async ({ message, args }) => {
    try {
      if (!args[0]) {
        return message.reply('Lütfen bir yama notu numarası veya adı belirtin.');
      }

      // Girdideki - karakterini . ile değiştir
      const patchName = args[0].replace('.', '-');

      const patchNotesUrl = `https://na.leagueoflegends.com/en-us/news/game-updates/patch-${patchName}-notes/`;

      const response = await axios.get(patchNotesUrl);
      const html = response.data;

      const $ = cheerio.load(html);
      const imageUrls = [];

      // Resim etiketlerini seç ve resim adreslerini çek
      $('img').each((index, element) => {
        const imageUrl = $(element).attr('src');
        if (imageUrl && imageUrl.startsWith('https://images.contentstack.io/v3/assets/')) {
          imageUrls.push(imageUrl);
        }
      });

      // Eğer belirli bir formattaki resim bulunamazsa hata mesajı gönder
      if (imageUrls.length === 0) {
        return message.reply('Belirtilen yama notlarındaki resimler alınamadı. Lütfen doğru bir yama notu adı veya numarası belirttiğinizden emin olun.');
      }

      // İlk resmi içeren bir embed mesajı oluştur
      const embed = new MessageEmbed()
        .setTitle(`League of Legends Yama Notları - ${patchName}`)
        .setDescription('Yama notlarının tamamını görmek için [buraya tıklayın](' + patchNotesUrl + ')')
        .setImage(imageUrls[2]) // İlk resmi ekleyin
        .setColor('#3498db'); // Embed rengini değiştirebilirsiniz

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Hata oluştu:', error);
      message.reply('Belirtilen yama notlarındaki resimler alınamadı. Lütfen doğru bir yama notu adı veya numarası belirttiğinizden emin olun.');
    }
  },
};
