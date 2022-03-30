const color = require('colors');
const ascii = require('ascii-table');
const table = new ascii('Commands');
const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require('mongoose')
const client = new Client({ intents: 515 });
const Logger = require('./utils/logger')

//client.commands = new Collection();
//client.buttons = new Collection();

const X = ['commands', 'buttons', 'selects']
const handlers = ['EventUtil', 'CommandUtil', 'ButtonUtil', 'SelectUtil']
require('./utils/Functions')(client)

X.forEach(x =>  {
	client[x] = new Collection();
});
handlers.forEach(handler => 
	{
		require(`./utils/handlers/${handler}`)(client); 
	}
);

process.on('exit', code => { Logger.client(`Le precessus s'est arrêté avec le code ${code} !`) })
process.on('uncaughtException', (err, origin) => { 
	Logger.error(`UNCAUGHT_EXCEPTION: ${err}`)
	console.error(`Origine: ${origin}`)
});
process.on('unhandledRejection', (reason, promise) => {
	Logger.warn(`UNHANDLED_REJECTION: ${reason}` )
	console.log(promise)
});
process.on('warning', (...args) => { Logger.warn(...args) })

mongoose.connect(process.env.DATABASE_URI, {
	autoIndex: false, 
	maxPoolSize: 10, 
	serverSelectionTimeoutMS: 5000, 
	socketTimeoutMS: 45000,
	family: 4
}).then (() => { 
	console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                      ┃
┃     Le client est connecté à la base de donnée !     ┃
┃                                                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n`.bold.magenta);
	console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                ┃
┃     Chargement en Cours...     ┃
┃                                ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n`.bold.yellow);
})
.catch (err => { console.log(`${err}`.bold.red) })

client.login(process.env.TEST)