const prefix = '!';
const ownerid = '688098375697956905';

module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(client, message) {
		if (message.author.bot) return;
		if (!message.content.startsWith(prefix)) return;

		let guildSettings = client.getGuild(message.guild);

		if (!guildSettings) {
			await client.createGuild(message.guild);
			guildSettings = await client.getGuild(message.guild);
		}

		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmdName = args.shift().toLowerCase();
		if (cmdName.length == 0) return;

		const cmd = client.commands.get(cmdName);
		if (!cmd) return;
		if(cmd.ownerOnly) {
			if(message.author.id != ownerid) return message.reply('Seuls les Administrateurs du bot peuvent utiliser cette commande')
		}

		if (!message.member.permissions.has([cmd.permissions])) return message.reply(`Vous n'avez pas la/les permission(s) requise(s) (\`${cmd.permissions.join(', ')}\`) pour tapper cette commande`);

		if (cmd) {
			cmd.run(client, message, args, guildSettings);
		}
	},
};