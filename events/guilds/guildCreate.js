const { Guild } = require('../../models/index')
const Logger = require('../../utils/logger')

module.exports = {
	name: 'guildCreate',
	once: false,
	async execute(client, guild) {
		await client.createGuild(guild);
	},
};