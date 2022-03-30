const colors = require('colors');
const package = require('../../package.json');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓'.bold.green);
		console.log('┃                               ┃'.bold.green);
		console.log('┃     Le bot est connecté !     ┃'.bold.green);
		console.log('┃                               ┃'.bold.green);
		console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n'.bold.green);

		// Instantané
		const devGuild = await client.guilds.cache.get('841813630172790834');
		devGuild.commands.set(client.commands.map(cmd => cmd));
		
		// Global => 1H minimum
		//client.application.commands.set(client.commands.map(cmd => cmd));

		let i = 0;
		const timeInSec = 10

		// Statut du Bot
		const statuses = [
			'ses engrenages...',
			'Un bon film.',
			'/help et !help',
			'derrière toi',
			`la version V.${package.version}`,
			'Karma Akabane#6802',
		];
		setInterval(() => {
			client.user.setActivity(statuses[i], {
				type: 'WATCHING',
				url: 'https://www.youtube.com/channel/UCoorq7xuhdcVe2hfRgu0_5g',
			});
			i = ++i % statuses.length;
		}, timeInSec*1000);
	},
};