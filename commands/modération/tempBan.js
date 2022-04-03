const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'tempban',
	description: 'Permet de bannir un membre du serveur temporairement',
    permissions: ['BAN_MEMBERS'],
	ownerOnly: false,
	usage: 'tempban [membre] [raison]',
	examples: ['tempban 30 @exemple#0000 pour avoir fait un truc'],
	category: 'modération',
    async run(client, message, args) {
        const duree = message.guild.members.cache.get(args[0]);
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        if (!duree) {
            return message.channel.send(`Vous devez préciser la durée du ban`);
        }
        if (!member) {
            return message.channel.send(`Vous devez mentionner un membre ou saisir son identifiant`);
        }
        const raison = args.slice(2).join(' ');
        if (!raison) {
            return message.channel.send(`Vous devez préciser la raison pour la quelle vous voullez bannir ${member}`);
        }

        if (message.member.roles.highest.position <= member.roles.highest.position) {
            message.reply({ ephemeral: true, content: `Vous ne pouvez pas bannir un membre supérieur ou égal à vous dans la hierarchie` });
        } else {
            try {
                await member.ban({ reason: raison, days: duree });
                message.reply({ ephemeral: true, content: `Le membre ${member.tag} à été bannis\npour la raison : ${raison}\nPendant : \`${duree} jours\`` });
            } catch (error) {
                message.reply({ ephemeral: true, content: `Une erreur est survenue lors du ban. Veuillez réessayer ulterieurement;` });
                message.channel.send(`Voici le message de l'erreur\`\`\`${error}\`\`\``);
            }
        }

		
	},
	options: [
		{
			name: 'membre',
			description: 'Membre à bannir',
			type: 'USER',
			required: true,
        },
        {
			name: 'duree',
			description: 'durée du ban temporaire',
			type: 'NUMBER',
			required: true,
		},
		{
			name: 'raison',
			description: 'Raison du ban',
			type: 'STRING',
			required: true,
		},
	],
	async runInteraction (client, interaction) {
        const member = interaction.options.membre;
        const raison = interaction.options.raison;
        const duree = interaction.options.duree;

        try {
            await member.createDM(true).then(channel => {
                channel.send (`Vous avez été banni temporairement du serveur ${message.guild.name} pour la raison suivante : ${raison}\nPendant : \`${duree} jours\``);
            })
            await interaction.guild.members.ban(member, { reason: raison, days: duree });
        interaction.reply({ ephemeral: true, content: `Le joueur ${member.tag} à été bannis\npour la raison : ${raison}\nPendant : \`${duree} jours\`` });
        } catch (error) {
            interaction.reply({ ephemeral: true, content: `Une erreur est survenue lors du ban. Veuillez réessayer ulterieurement;` });
            console.error(error);
        }
	}
};