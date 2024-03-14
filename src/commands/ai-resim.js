const { Hercai } = require('hercai');
const herc = new Hercai();

// Yasaklı kelimeler listesi
const yasakliKelimeler = ['Allah var mı', 'Sikeyim', 'Göt' , 'yarrak' , 'am' , 'sikim', 'sik', 'yarrak', 'porno', 'fuck', 'ass' , 'dick' , 'porn', 'hentai', 'nude', 'çıplak', 'sex' , 'seks' , 'boob' , 'horny' ];


module.exports = {
  conf: {
    aliases: ["çiz", "resim"],
    name: 'çiz',
    help: 'çiz: [İçerik]',
    enabled: true,
    slash: false, // Prefix ile kullanılacak
  },

  run: async ({ client, message, args }) => {
    const prompt = args.join(" "); // Kullanıcının girdiği tüm argümanları birleştir
    // START MESSAGE TYPING
    message.channel.sendTyping()

    // Yasaklı kelimeler kontrolü
    if (yasakliKelimeler.some(kelime => prompt.toLowerCase().includes(kelime.toLowerCase()))) {
      message.reply('Bu kelimenin kullanımı yasaktır.');
      return;
    }

    herc.drawImage({ model: "shonin", prompt: prompt, negative_prompt: "" }).then(response => {
      message.reply({ content: `${response.url}` });
    }).catch(err => {
      console.error("Yapayzeka Hata:", err);
      message.reply("Yapayzeka API'sine ulaşılamıyor veya bir hata oluştu.");
    });
  }
};
