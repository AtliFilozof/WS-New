const turkceSozluk = require('turkce-sozluk');

module.exports = {
  conf: {
    aliases: ['sozluk', 'sözlük', 'tdk'],
    name: 'Sözlük',
    help: 'sözlük Bir kelimenin sözlükteki anlamını öğrenmenizi sağlar.',
    enabled: true,
    slash: false,
  },

  run: async ({ client, message, args }) => {
    // Kullanıcının girdiği kelimeyi args'ten al
    const kelime = args.join(' ');

    if (!kelime) {
      return message.reply('Lütfen bir kelime girin.');
    }

    // turkceSozluk fonksiyonunu kullanarak kelimenin anlamını al
    turkceSozluk(kelime).then(data => {
      if (!data) {
        // Eğer veri bulunamazsa
        message.channel.send('Sözcüğü bulamadım. Tekrar dener misiniz?');
      } else {
        // Eğer veri bulunursa
        const anlam = data[0].anlamlarListe ? data[0].anlamlarListe.join(', ') : 'Anlam bulunamadı.';
        message.channel.send(anlam.madde_anlam);
      }
    }).catch(err => {
      // Hata durumunda
      console.error('Sözlük hatası:', err);
      message.channel.send('Bir hata oluştu. Lütfen tekrar deneyin.');
    });
  },
};

