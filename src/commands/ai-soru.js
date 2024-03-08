const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports = {
  conf: {
    aliases: ["soru-sor", "yapayzeka", "yapay-zeka"],
    name: 'soru',
    help: 'soru: [Sorunuz]',
    enabled: true,
    slash: false, // Prefix ile kullanılacak
  },

  run: async ({ client, message, args }) => {

    var soru = args.slice(0).join(" ")

    // START MESSAGE TYPING
    message.channel.sendTyping()

    herc.question({ model: "v3", content: `${soru}` }).then(response => {
      const cevap = response.reply ? response.reply : "Bu soruyu anlamadım?";
      message.reply({ content: `${cevap}` });
    }).catch(err => {
      console.error("Yapayzeka Hata:", err);
      message.reply("Yapayzeka API'sine ulaşılamıyor veya bir hata oluştu.");
    });
  }
};
