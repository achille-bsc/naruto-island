const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'roles-menu',
	async runInteraction (client, interaction) {
		interaction.member.roles.add(interaction.values)
		interaction.reply({ content: `Félicitation vous venez de récupérer un rôles !`, ephemeral: true })
	}
};