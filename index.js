const TelegramBot = require("node-telegram-bot-api");
const token = "5523403818:AAEoWPnWkxHn9FX0kbZAuL7AscjFR4z701c";

const bot = new TelegramBot(token, {
  polling: true,
});

bot.setMyCommands([{
    command: '/start',
    description: "Bot haqida ma'lumot"
  },
  {
    command: '/info',
    description: "O'zingiz haqingizda ma'lumot"
  },
  {
    command: '/game',
    description: "O'yin o'ynash"
  }
])

bot.on("message", async (msg) => {
  console.log(msg);
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "/start") {
    await bot.sendSticker(
      chatId,
      "https://tlgrm.eu/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/192/1.webp"
    );
    return bot.sendMessage(
      chatId,
      `Assalamu alaykum ${msg.from?.first_name} xush kelibsiz botga`
    );
  }

  if (text === "/info") {
    await bot.sendAnimation(
      chatId,
      "https://tlgrm.eu/_/stickers/d1a/ca8/d1aca894-0647-406c-b201-83f8d9ecca93/thumb-animated-128.mp4"
    );
    await bot.sendPhoto(chatId, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAoV37vu39hxX27oblf-yyrSdBJj0p0i0XrA&usqp=CAU")
    return bot.sendMessage(
      chatId,
      `Sizni username bu ${msg.from?.username}, sizni ismingiz ${msg.from?.first_name} ${msg.from?.last_name} shular`
    );
  }

  bot.sendMessage(chatId, "Uzur sizni gapingizga tushunmadim!! ):")
});