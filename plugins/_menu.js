const bot = require('../lib/events')
const {
	ctt,
	addSpace,
	textToStylist,
	PREFIX,
	getUptime,
	PLUGINS,
	getRam,
} = require('../lib/')
const { VERSION } = require('../config')
bot.addCommand(
	{
		pattern: 'menu ?(.*)',
		fromMe: true,
		dontAddCommandList: true,
	},
	async (message, match) => {
		const date = new Date()
		let CMD_HELP = `
		āØ š·ššš š©šš āØ

ā­āāāāāāāāāāāāāāāā
ā Prefix : ${PREFIX}
ā Current Time : ${date.toLocaleTimeString()}
ā Version : 1.0
ā Total Plugins : ${PLUGINS.count}
ā Ram Usage : ${getRam()}
ā Bot Uptime : ${getUptime('t')}
ā Developer: Fantox
ā°āāāāāāāāāāāāāāāā

`
		const commands = []
		bot.commands.map(async (command, index) => {
			if (
				command.dontAddCommandList === false &&
				command.pattern !== undefined
			) {
				commands.push(ctt(command.pattern))
			}
		})
		commands.forEach((command, i) => {
			CMD_HELP += `ā ${i + 1} ${addSpace(
				i + 1,
				commands.length
			)}${textToStylist(command.toUpperCase(), 'mono')}\n`
		})
		CMD_HELP += `\nš *Pixy Bot* by *Fantox* š`
		return await message.sendMessage('```' + CMD_HELP + '```')
	}
)
