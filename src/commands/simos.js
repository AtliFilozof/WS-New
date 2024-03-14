module.exports = {
  conf: {
    aliases: ['simos', '<3'],
    name: 'simos',
    help: 'simos',
    enabled: true,
    slash: false, // Prefix ile kullanılacak
  },

  run: async ({ client, message, args }) => {
          // Sadece belirli kişilerin kullanmasına izin ver
      const allowedUsers = ['834116976636330035', '981501891030700082']; // Kullanılmasına izin verilen kişilerin Discord ID'leri
  
      // Mesajı atan kişinin ID'sini al
      const messageAuthorID = message.author.id;
  
      // Eğer mesaj atan kişi izin verilen kişiler arasında değilse
      if (!allowedUsers.includes(messageAuthorID)) {
        return message.channel.send('Bu komutu kullanma izniniz yok!');
      }
    
    // Sevgilinizin adını belirleyin (args[0] olarak alalım)
    const sevgilininAdi = args[0] || 'Simos';

    // Romantik bir mesaj oluştur
    const romantikMesaj = `
      🌟 **Sevgili ${sevgilininAdi}** 🌟
      Son aylarımı hayatımın en güzel zamanları yapan bunlar olurken sadece ve sadece yanimda oldugun ve beni sevdigini sonuna kadar hissettirdigin icin tesekkur ederim.
      Dun yasanan olaylari ve kirginligindan bugun bununla kurtulmak istiyorum. Sinem güzel, akıllı sevdiğim senden hoşlandığımdan duygularımdan her şeyden eminim fakat artık buna bir nokta koymak istiyorum
      Öncelikle her şeyden önce seni böyle güzel doğuran annenin ellerinden babanın testislerinden öperim. Böyle güzel ve akıllı olduğun için seninle gurur duyuyorum. 
      Beni asla üzmediğin çevrene hep güzelliğini kattığın için seni hep çok sevdim. Doğum gününe sadece bir gün diyip geçiyordun ama ben buna bir anlam yüklemek istiyorum.
      Simos'um güzelim doğum günün kutlu olsun. Seninle olan ilişkimi bir adım öteye taşıyıp bu gününü gerçekten özel kılmamı sağlar mısın (evet veya hayir yazman grk)
    `;

    // Mesajı gönder
    message.channel.send(romantikMesaj);

    // Kullanıcının cevaplamasını bekleyin
    const filter = (response) => response.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({ filter, time: 180000 });

    collector.on('collect', (response) => {
      if (response.content.toLowerCase() === 'evet') {
        message.channel.send(`❤️ SENİ ÇOK SEVİYORUM, TEŞEKKÜR EDERİM. Seninle geçirdiğim bu zamanlara bir ileri seviyesini eklediğim için çok mutluyum. ❤️`);
      } else if (response.content.toLowerCase() === 'hayır') {
        message.channel.send(`😔Bunu duyduğuma üzüldüm, belki başka bir zaman. Seninle geçirdiğim her an bile benim için özel. ❤️`);
      } else {
        message.channel.send(`Bilinmeyen bir seçenek, ancak seninle olmak benim için her zaman doğru bir seçenek. ❤️`);
      }
      collector.stop();
    });

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        message.channel.send(`⌛ Zaman doldu, belki bir sonraki romantik anı beklemek en iyisi olur. ❤️`);
      }
    });
}
};
