const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports = {
  conf: {
    aliases: ["çiz", "resim"],
    name: 'çiz',
    help: 'çiz: [İçerik]',
    enabled: true,
    slash: false, // Prefix ile kullanılacak
  },

  run: async ({ client, message, args }) => {

    /* Available Models */
    /* "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia", "simurg", "animefy", "raava", "shonin" */

    const prompt = args.join(" "); // Kullanıcının girdiği tüm argümanları birleştir
    // START MESSAGE TYPING
    message.channel.sendTyping()

    herc.drawImage({ model: "shonin", prompt: prompt, negative_prompt: "" }).then(response => {
      message.reply({ content: `${response.url}` });
    }).catch(err => {
      console.error("Yapayzeka Hata:", err);
      message.reply("Yapayzeka API'sine ulaşılamıyor veya bir hata oluştu.");
    });
  }
};
