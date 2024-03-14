const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    conf: {
        aliases: ["rusruleti"],
        name: "rusruleti",
        enabled: true,
        slash: false
    },
    run: async ({ message, args }) => {
        // Yalnızca yönetici iznine sahip kullanıcıları kontrol et
        if (!message.member.permissions.has("ADMINISTRATOR")) {
          return message.reply("Bu komutu kullanmak için yönetici iznine sahip olmalısınız.");
      }

        const players = message.guild.members.cache.filter(member => !member.user.bot).map(member => member.user);

        const numberOfPlayers = 5;

        const buttonLabels = Array.from({ length: numberOfPlayers }, (_, index) => `Royals Power ${index + 1}`);

        const buttonPresses = Array.from({ length: numberOfPlayers }, () => false);

        const buttonFunctions = buttonLabels.map((label, index) => async (interaction) => {
            if (buttonPresses[index]) {
                await interaction.reply({ content: "Sadece bir butona basma hakkınız var.", ephemeral: true });
                return;
            }

            buttonPresses[index] = true;

            const buttonsDisabled = buttonLabels.map((_, i) => buttonPresses[i]);

            const clickedUser = interaction.user.id;

            await interaction.update({
                content: `<@${clickedUser}> butona bastı!`,
                components: [
                    new MessageActionRow()
                        .addComponents(
                            buttonLabels.map((label, i) => new MessageButton()
                                .setCustomId(`button_${i}`)
                                .setLabel(label)
                                .setStyle("DANGER")
                                .setDisabled(buttonsDisabled[i]))
                        )
                ]
            });

            if (buttonPresses.every(pressed => pressed)) {
                const randomUserId = players[Math.floor(Math.random() * players.length)];
                const member = await message.guild.members.fetch(randomUserId);
                await member.ban({ reason: "Rus Ruleti oyununu kaybetti!" });
                await interaction.channel.send(`Rus Ruleti oyunu sona erdi! ${member.user.tag} sunucudan banlandı.`);
            }
        });

        const row = new MessageActionRow()
            .addComponents(
                buttonLabels.map((label, index) => new MessageButton()
                    .setCustomId(`button_${index}`)
                    .setLabel(label)
                    .setStyle("SUCCESS")
                    .setDisabled(false))
            );

        const messageSent = await message.channel.send({
            content: `Rus Ruleti oyunu başladı! Her butona sadece bir kişi basabilir.`,
            components: [row]
        });

        const filter = i => buttonPresses.some(pressed => !pressed) && i.isButton() && i.customId.startsWith('button_');
        const collector = messageSent.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async (interaction) => {
            const buttonIndex = parseInt(interaction.customId.split('_')[1]);
            await buttonFunctions[buttonIndex](interaction);
        });
    }
};
