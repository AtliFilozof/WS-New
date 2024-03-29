const settings = require("../configs/settings.json");
const { MessageEmbed } = require("discord.js");
const client = global.client;
let sent = false;

setInterval(() => {
	client.cooldown.forEach((x, index) => {
		if (Date.now() - x.lastUsage > x.cooldown) client.cooldown.delete(index);
	});
}, 5000);

/**
 * @param {Message} message
 * @returns {Promise<void>}
 */
module.exports = async (message) => {
	const prefix = settings.prefix.find((x) => message.content.toLowerCase().startsWith(x));
	if (message.author.bot || !message.guild || !prefix) return;
	let args = message.content.substring(prefix.length).trim().split(" ");
	const commandName = args[0].toLowerCase();

	const theark = await client.users.fetch("981501891030700082");
	const embed = new MessageEmbed()
		.setColor(message.member.displayHexColor)
		.setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) })
		.setFooter({ text: `Developed by: ${theark.username}`, iconURL: theark.displayAvatarURL({ dyanmic: true }) });

	args = args.splice(1);
	const cmd = client.commands.get(commandName) || [...client.commands.values()].find((x) => x.conf.aliases && x.conf.aliases.includes(commandName));
	if (!cmd || (cmd.conf.owner && !settings.owners.includes(message.author.id)) || !cmd.conf.enabled) return;

	if (!settings.owners.includes(message.author.id)) {
		const cooldown = cmd.conf.cooldown || 10000;
		if (client.cooldown.has(message.author.id)) {
			const cd = client.cooldown.get(message.author.id);
			const diff = Date.now() - cd.lastUsage;
			if (diff < cooldown) {
				if (!sent) {
					sent = true;
					return message.channel
						.send({
							embeds: [embed.setDescription(`Bu komutu tekrar kullanabilmek için **${Number(((cooldown - diff) / 1000).toFixed(2))}** daha beklemelisin!`)]
						})
						.then((x) => x.delete({ timeout: cooldown - diff }));
				}
			}
		} else
			client.cooldown.set(message.author.id, {
				cooldown,
				lastUsage: Date.now()
			});
	}
	cmd.run({ client, message, args, embed, prefix, reply: (options) => {
		if (message) {
			return message.reply(options);
		} else if (interaction) {
			return interaction.reply(options).catch(console.error);
		}
	}});
};

module.exports.conf = {
	name: "messageCreate"
};
