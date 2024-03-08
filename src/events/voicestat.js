const { MessageEmbed } = require("discord.js");
const client = global.client;
const fs = require("fs");
const dersSema = require("../schemas/dersSema");

// Belirli iki kanalın IDsini belirt
const allowedChannelIds = ["1211623627938865152", "1211623646620286987"];

module.exports = async (message) => {
    // Kontrol etmek istediğin kanalları içeren diziyi tanımla
    const allowedChannelIds = ["1211623627938865152", "1211623646620286987"];

    // Eğer mesaj gönderen bir üye ise ve belirli iki kanalda bulunuyorsa
    if (
        message.member &&
        message.member.voice &&
        message.member.voice.channel &&
        allowedChannelIds.includes(message.member.voice.channel.id)
    ) {
        const voiceChannel = message.member.voice.channel;
        const voiceDuration = getVoiceDuration(message); // Bu fonksiyonu implemente et, ses süresini al

        // Ses süresini dersSema.js dosyasına kaydet
        dersSema.kaydet(voiceChannel.id, voiceDuration);

        // Daha fazla işlemleri buraya ekleyebilirsin
    }
};

module.exports.conf = {
    name: "voicestat"
};

// Ses süresini kaydetmek için bir fonksiyon
function getVoiceDuration(message) {
    // İlgili kodları buraya ekle, ses süresini hesapla ve döndür
    // Örneğin, message.createdAt kullanarak başlangıç ve bitiş zamanlarını alabilirsin
    // Ve ardından süreyi hesaplayabilirsin
}
