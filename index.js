const dotenv = require("dotenv")
const { Telegraf } = require("telegraf")

const optionController = require("./controllers/optionController")
const questionController = require('./controllers/questionController')

let validator = 0
    userInsert = false
    elementCount = false
    dataType = ""
    dataText = ""
    dataCount = 0
    countage = 0

dotenv.config()

const bot = new Telegraf(process.env.TOKEN)

async function botReply(ctx){
    try {

        validator += 1

        const question = await questionController.findQuestion(ctx.message.text, validator)

        if(question.answer) await ctx.reply(question.answer)


        if(question.user_insert == false){
            const options = await optionController.findOptions(question.id)

            await options.forEach(option => {
                ctx.reply(`- ${option}`)
            });
        } else {
            if(question.element_count == true) elementCount = true
            userInsert = true
            dataType = ctx.message.text
            dataText = question.data_text
        }

        
    } catch (error) {
        ctx.reply("Desculpe, não reconheci este comando! Por favor verifique se a grafia está correta.")

        if(validator != 0) validator = validator - 1

        console.error(error)
    }
    
}

async function insertData(ctx, dataType, dataNumber){
    try {

        if(dataNumber != 0 && countage != 0){

            ctx.reply(`- ${dataType} ${countage}:`)

            await questionController.insertValue(ctx.message.text, dataType)

            ctx.reply(`{${ctx.message.text}}`)

            userInsert = true

        } 
        
        if(dataNumber == 0){

            await questionController.insertValue(ctx.message.text, dataType)

            userInsert = false
            validator += 1


        }

        ctx.reply(dataText)


        dataType = ""
        dataText = ""
        countage = countage + 1

        if(dataNumber != 0 && countage-1 == Number(dataNumber)){
            dataNumber = 0
            countage = 0
            ctx.reply("Elementos registrados. Qual o próximo passo?")
        }



    } catch (error) {
        console.error(error)
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

        if(elementCount == true){
            dataCount = Number(ctx.message.text)
            elementCount = false
        }


        if(userInsert){
            return insertData(ctx, dataType, dataCount)
        }

        return botReply(ctx)
        
    } catch (error) {
        console.error(error)
        ctx.reply("Desculpe, não reconheci este comando! Por favor verifique se a grafia está correta.")
    }
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
