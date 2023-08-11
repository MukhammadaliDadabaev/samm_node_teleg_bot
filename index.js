const TelegramBot = require("node-telegram-bot-api");
const {
  gameOptions,
  agameOptions
} = require("./options")
const token = "5523403818:AAEoWPnWkxHn9FX0kbZAuL7AscjFR4z701c";

const bot = new TelegramBot(token, {
  polling: true,
});

const obj = {};

const startGame = async chatId => {
  await bot.sendMessage(
    chatId,
    "Kompyuter 0 dan 9 gacha son o'ylaydi va Siz kompyuter o'ylagan sonni topasiz...):"
  );
  const randomNumber = Math.floor(Math.random() * 10);
  obj[chatId] = randomNumber;
  await bot.sendMessage(chatId, "To'gri sonni toping.", gameOptions);
};

const botstrapBot = () => {
  bot.setMyCommands([{
      command: "/start",
      description: "Bot haqida ma'lumot",
    },
    {
      command: "/info",
      description: "O'zingiz haqingizda ma'lumot",
    },
    {
      command: "/game",
      description: "O'yin o'ynash",
    },
  ]);

  bot.on("message", async (msg) => {
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
      await bot.sendPhoto(
        chatId,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAoV37vu39hxX27oblf-yyrSdBJj0p0i0XrA&usqp=CAU"
      );
      return bot.sendMessage(
        chatId,
        `Sizni username bu ${msg.from?.username}, sizni ismingiz ${msg.from?.first_name} ${msg.from?.last_name} shular`
      );
    }

    if (text === "/game") {
      return startGame(chatId);
    }
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "/again") {
      await startGame(chatId)
    }

    if (data == obj[chatId]) {
      await bot.sendMessage(
        chatId,
        `Tabriklaymiz siz to'g'ri topdingiz, Kompyuter ${obj[chatId]} sonni tanlagan edi`
      );
    } else {
      await bot.sendMessage(
        chatId,
        `Siz noto'g'ri son tanladingiz tanlagan sonningiz ${data}, Kompyuter ${obj[chatId]} sonni tanlagan edi`,
        agameOptions
      );
    }
  });
};

botstrapBot();