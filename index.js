const dotenv = require("dotenv")
const { Telegraf } = require("telegraf")

dotenv.config()

const bot = new Telegraf(process.env.TOKEN)

bot.start((ctx) => {
    ctx.reply("Bem vindo, Programador!")
})

bot.help((ctx) => {
    ctx.reply("help")
})

bot.settings((ctx) => {
    ctx.reply("settings")
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))