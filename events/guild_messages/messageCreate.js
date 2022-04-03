const prefix = '!';
const ADMINROLES = require('../../utils/storages/admins-roles.json').adminsroles;

module.exports = {
	name: 'messageCreate',
	once: false,
	async execute(client, message) {
		if (message.author.bot) return;
		if (!message.content.startsWith(prefix)) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmdName = args.shift().toLowerCase();
		if (cmdName.length == 0) return;

		const cmd = client.commands.get(cmdName);
		if (!cmd) return;
		if(cmd.ownerOnly) {
			
			if(!message.member.permissions.has([cmd.permissions]) && ADMINROLES.forEach(roleid => {
				if (message.author.roles.includes(roleid)) return false
			})) return message.reply(`Vous n'avez pas la/les permission(s) requise(s) (\`${cmd.permissions.join(', ')}\`) pour tapper cette commande`)
		}

		if (cmd) {
			cmd.run(client, message, args);
		}
	},
};