const userInstagram = require("user-instagram");


module.exports = {
  conf: {
    aliases: ['instagram','insta'],
    name: 'instagram',
    help: 'instagram Stalk yaparsınız.',
    enabled: true,
    slash: false, // Prefix ile kullanılacak
  },

  run: async ({ client, message, args }) => {
  
  const kullanıcı = message.content.split(" ").slice(1).join(" ");
  userInstagram(`${kullanıcı}`).then(data => {
      if(!data || data === null || data === undefined) return message.reply(`Kullanıcı adını lütfen @ olmadan sadece isim olarak giriniz.`)
      if(data.isBusinessAccount === false) {ishesabi = "Hayır"} else {ishesabi = "Evet"};
      if(data.isPrivate === false) { gizlihesap = "Hayır"} else {gizlihesap = "Evet"};
      if(data.isVerified === false) {onaylihesap = "Hayır"} else {onaylihesap = "Evet"};
      if(!data.fullName || data.fullName === null || data.fullName === undefined) {isim = "İsimsiz"} else {isim = data.fullName}
      if(!data.biography || data.biography === null || data.biography === undefined) {bio = "Biografi yok."} else {bio = data.biography}
      const embed = new Discord.MessageEmbed()
      .setTitle(`İstediğiniz kullanıcının hesap bilgileri`)
      .setThumbnail(`${data.profilePicHD}`)
      .addFields(
          {name: "İsim", value: `${isim}`, inline: false},
          {name: "Profil Bağlantısı", value: `[Instagram](${data.link})`, inline: false},
          {name: "Biografi", value: `${bio}`, inline: false},
          {name: "Takip Ettiği Kişi Sayısı", value: `\`${data.subscribtions}\``, inline: true},
          {name: "Takip Eden Kişi Sayısı", value: `\`${data.subscribersCount}\``, inline: true},
          {name: "Kullanıcı Etiketi", value: `@${data.username}`, inline: false},
          {name: "İş hesabı mı?", value: `${ishesabi}`, inline: true},
          {name: "Gizli hesap mı?", value: `${gizlihesap}`, inline: true},
          {name: "Onaylı hesap mı?", value: `${onaylihesap}`, inline: true},
          {name: "Gönderi Sayısı", value: `\`${data.postsCount}\``, inline: false}
      )
      message.channel.send(embed)
  })

}
};
