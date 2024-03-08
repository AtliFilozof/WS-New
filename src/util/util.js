const { GuildMember, MessageEmbed } = require("discord.js");
const { emojis } = require("../configs/config.json");

/**
 * @param { Client } client
 */
module.exports = function (client) {
	/**
	 * @param {String|Array} role
	 * @param {Boolean} every
	 * @returns {Boolean}
	 */
	GuildMember.prototype.hasRole = function (role, every = true) {
		return (
			(Array.isArray(role) && ((every && role.every((x) => this.roles.cache.has(x))) || (!every && role.some((x) => this.roles.cache.has(x))))) || (!Array.isArray(role) && this.roles.cache.has(role))
		);
	};

	/**
	 * @param {String} type
	 * @param {Array} channels
	 */
	/**
	 * @param {Number} value
	 * @param {Number} maxValue
	 * @param {Number} size
	 * @returns {String}
	 */
	client.progressBar = (value, maxValue, size) => {
		const progress = Math.round(size * (value / maxValue > 1 ? 1 : value / maxValue));
		const emptyProgress = size - progress > 0 ? size - progress : 0;

		const progressText = emojis.fill.repeat(progress);
		const emptyProgressText = emojis.empty.repeat(emptyProgress);

		return emptyProgress > 0
			? progress === 0
				? emojis.emptyStart + progressText + emptyProgressText + emojis.emptyEnd
				: emojis.fillStart + progressText + emptyProgressText + emojis.emptyEnd
			: emojis.fillStart + progressText + emptyProgressText + emojis.fillEnd;
	};

	/**
	 * @returns {any}
	 */
	Array.prototype.random = function () {
		return this[Math.floor(Math.random() * this.length)];
	};

	Array.prototype.last = function () {
		return this[this.length - 1];
	};

	Array.prototype.listRoles = function (type = "mention") {
		return this.length > 1
			? this.slice(0, -1)
					.map((x) => `<@&${x}>`)
					.join(", ") +
					" ve " +
					this.map((x) => `<@&${x}>`).slice(-1)
			: this.map((x) => `<@&${x}>`).join("");
	};
};
