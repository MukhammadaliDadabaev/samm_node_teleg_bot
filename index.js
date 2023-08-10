const TelegramBot = require('node-telegram-bot-api');
const token = "5523403818:AAEoWPnWkxHn9FX0kbZAuL7AscjFR4z701c"

const bot = new TelegramBot(token, {
  polling: true
})

bot.on("message", async msg => {
  const text = msg.text
  const chatId = msg.chat.id

  if (text === '/start') {
    return bot.sendMessage(chatId, "ALI Assalamu alaykum.")
  }
  if (text === '/info') {
    return bot.sendMessage(chatId, "Test bot")
  }
})