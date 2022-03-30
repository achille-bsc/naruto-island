const { MessageEmbed, Formatters } = require('discord.js')
const dayjs = require('dayjs')

const colors = require('colors');
module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async execute(client, member) {

		const embed = new MessageEmbed()
			.setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
			.setColor('GREEN')
			.setDescription(`± Nom d'utilisateur: ${member}
			± Créé le: <t:${parseInt(member.user.createdTimestamp / 1000 )}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
			± Rejoint le: <t:${parseInt(member.joinedTimestamp / 1000 )}:f> (<t:${parseInt(member.joinedTimestamp / 1000 )}:R>)`)
			.setTimestamp()
			.setFooter({ text: `L'utilisateur à rejoint !` })

		const logChannel = client.channels.cache.get('946528565271330886');

		logChannel.send({ embeds: [embed] });
	},
};