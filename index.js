const dotenv = require("dotenv")
const { Telegraf } = require("telegraf")

const optionController = require("./controllers/optionController")
const questionController = require('./controllers/questionController')

let validator = 0
let userInsert = false
let dataType = ""
let dataText = ""

dotenv.config()

const bot = new Telegraf(process.env.TOKEN)

async function botReply(ctx){
    try {

        validator += 1

        const question = await questionController.findQuestion(ctx.message.text, validator)

        await ctx.reply(question.answer)

        if(question.user_insert == false){
            const options = await optionController.findOptions(question.id)

            await options.forEach(option => {
                ctx.reply(`- ${option}`)
            });
        } else {
            userInsert = true
            dataType = ctx.message.text
            dataText = question.data_text
        }

        
    } catch (error) {
        ctx.reply("Desculpe, não reconheci este comando! Por favor verifique se a grafia está correta.")

        if(validator != 0) validator = validator - 1
    }
    
}

async function insertData(ctx){
    try {
        await questionController.insertValue(ctx.message.text, dataType)

        ctx.reply(dataText)

        validator += 1
        userInsert = false
        dataType = ""
        dataText = ""

    } catch (error) {
        ctx.reply("Desculpe, não reconheci este comando! Por favor verifique se a grafia está correta.")
    }
}

bot.start((ctx) => {
    validator = 0

    ctx.reply("Bem vindo, Programador! Irei te auxiliar a construir seus primeiros códigos em Javascript. Vamos começar?")

    ctx.reply("Digite 'iniciar' para começar. Você pode acessar as configurações com '/settings' ou pedir uma ajudinha com '/help' ")
})

bot.help((ctx) => {
    ctx.reply("ajuda")
})

bot.settings((ctx) => {
    ctx.reply("configurações")
})


bot.on('text', (ctx) => {
    try {
        ctx.message.text = ctx.message.text.toLowerCase()
        console.log(ctx.message.text)
        if(userInsert){
            return insertData(ctx)
        }

        return botReply(ctx)
        
    } catch (error) {
        ctx.reply("Desculpe, não reconheci este comando! Por favor verifique se a grafia está correta.")
    }
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))