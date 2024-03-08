const { Collection } = require('discord.js');

// cooldowns nesnesi, kullanıcılara özel cooldown sürelerini takip etmek için kullanılır
const cooldowns = new Collection();

module.exports = {
  conf: {
    aliases: ['sil'],
    name: 'mesajsil',
    help: 'sil Belirtilen miktarda mesajı siler.',
    enabled: true,
    slash: false,
  },

  run: async ({ message, args }) => {
    // Sadece Mesajları Yönet iznine sahip kişilerin bu komutu kullanmasına izin ver
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.channel.send('Bu komutu kullanma yetkiniz yok!');
    }

    // Kullanıcıya özel cooldown süresini al
    const userCooldown = cooldowns.get(message.author.id);

    // Kullanıcı daha önce bu komutu kullandıysa ve cooldown süresi devam ediyorsa
    if (userCooldown && userCooldown > Date.now()) {
      return message.channel.send(`Bu komutu tekrar kullanabilmek için ${((userCooldown - Date.now()) / 1000).toFixed(1)} saniye bekleyin.`);
    }

    // Silinecek mesaj sayısını kontrol et
    const amount = parseInt(args[0]);

    // Geçerli bir sayı değilse veya 1 ile 100 arasında değilse hata mesajı gönder
    if (isNaN(amount) || amount < 1 || amount > 100) {
      return message.channel.send('Lütfen 1 ile 100 arasında geçerli bir sayı girin.');
    }

    try {
      // Kanaldaki mesajları al
      const messages = await message.channel.messages.fetch({ limit: amount + 1 });

      // Sadece belirtilen kriterlere uyan mesajları filtrele
      const messagesToDelete = messages.filter(msg => {
        // Botun kendi komutları hariç
        return !msg.content.startsWith(message.client.prefix) &&
               // .sil ifadesi hariç
               !msg.content.includes('.sil');
      });

      // Silinecek mesaj sayısı kanaldaki toplam mesaj sayısından fazlaysa
      if (amount > messagesToDelete.size) {
        return message.channel.send(`Kanalda toplam ${messagesToDelete.size} mesaj var ve bu kadarını silebildim.`);
      }

      // Mesajları sil
      await message.channel.bulkDelete(messagesToDelete, true);

      // Silinen mesajları kullanıcıya bildir
      message.channel.send(`Başarıyla ${messagesToDelete.size} mesaj silindi.`).then(msg => {
        // 5 saniye sonra silinen mesajı kapat
        setTimeout(() => {
          msg.delete();
        }, 5000);
      });

      // Cooldown süresini ayarla (örnekte 10 saniye)
      const cooldownTime = 10000; // milisaniye cinsinden cooldown süresi
      cooldowns.set(message.author.id, Date.now() + cooldownTime);

    } catch (error) {
      console.error('Mesaj silme hatası:', error);
      message.channel.send('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  },
};
