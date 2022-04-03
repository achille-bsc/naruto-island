const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const LogChannel = require('../../utils/storages/log-channel.json');

module.exports = {
	name: 'kick',
	description: 'Permet d\'expulser un membre du serveur',
    permissions: ['KICK_MEMBERS'],
	ownerOnly: false,
	usage: 'kick [membre] [raison]',
	examples: ['kick @exemple#0000 pour avoir fait un truc'],
	category: 'modération',
	async run (client, message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send(`Vous devez mentionner un membre ou saisir son identifiant`);
        }
        const raison = args.slice(1).join(' ');
        if (!raison) {
            return message.channel.send(`Vous devez préciser la raison pour la quelle vous voullez expulser ${member}`);
        }

        if (message.member.roles.highest.position <= member.roles.highest.position) {
            message.reply({ ephemeral: true, content: `Vous ne pouvez pas expulser un membre supérieur ou égal à vous dans la hierarchie` });
        } else {
            try {
                await member.kick({ reason: raison });
                message.reply({ ephemeral: true, content: `Le membre \`${member.tag}\` a bien été expulsé.` });
            } catch (error) {
                message.reply({ ephemeral: true, content: `Une erreur est survenue lors de l'expulsion de ${member}. Veuillez réessayer ulterieurement;` });
                message.channel.send(`Voici le message de l'erreur\`\`\`${error}\`\`\``);
            }
        }

		
	},
	options: [
		{
			name: 'membre',
			description: 'Membre à expulser',
			type: 'USER',
			required: true,
		},
		{
			name: 'raison',
			description: 'Raison de l\'expulsion',
			type: 'STRING',
			required: true,
		},
	],
	async runInteraction (client, interaction) {
        const member = interaction.options.membre;
        const raison = interaction.options.raison;

        if (interaction.member.roles.highest.position <= member.roles.highest.position) {
            interaction.reply({ ephemeral: true, content: `Vous ne pouvez pas expulser un membre supérieur ou égal à vous dans la hierarchie` });
        } else {
            try {
                await member.kick({ reason: raison });
            interaction.reply({ ephemeral: true, content: `Le membre \`${member.tag}\` a bien été banni.` });
            } catch (error) {
                interaction.reply({ ephemeral: true, content: `Une erreur est survenue lors de l'expulsion de ${member}. Veuillez réessayer ulterieurement;` });
                console.error(error);
            }
        }
	}
};