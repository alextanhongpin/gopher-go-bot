const TelegramBot = require('node-telegram-bot-api')

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_API

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true})

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id

//   // send a message to the chat acknowledging receipt of their message
//   // bot.sendPhoto(chatId, './static/gentleman.jpg')
//   bot.sendMessage(chatId, 'Hi! Welcome!')
// })

const Photo = (id, src) => {
  const url = 'https://static-qkkxutmvef.now.sh/' + src
  return {
    type: 'photo',
    id: id.toString(),
    photo_url: url,
    thumb_url: url,
    title: src.replace(/\.(gif|jpe?g|tiff|png)$/i, '')
  }
}
const photos = [
  Photo(1, 'gobuffalo.jpg'),
  Photo(2, 'golang_berlin.jpg'),
  Photo(3, 'gopher.jpeg'),
  Photo(4, 'gopher_2.png'),
  Photo(5, 'gopher_3.png'),
  Photo(6, 'gopher_4.jpg'),
  Photo(7, 'gopher_academy.jpeg'),
  Photo(8, 'gopher_adventure.jpg'),
  Photo(9, 'gopher_aviator.png'),
  Photo(10, 'gopher_brown.jpeg'),
  Photo(11, 'gopher_china.jpg'),
  Photo(12, 'gopher_coding.jpg'),
  Photo(13, 'gopher_cowboy.jpeg'),
  Photo(14, 'gopher_crazy.jpeg'),
  Photo(15, 'gopher_gotham.png'),
  Photo(16, 'gopher_mexican.jpg'),
  Photo(17, 'gopher_pair.jpeg'),
  Photo(18, 'gopher_rich.jpg'),
  Photo(19, 'gopher_white.png'),
  Photo(20, 'gophercon_brazil_2016.png'),
  Photo(21, 'gophercon_denver_2016.png'),
  Photo(22, 'gophercon_india_2015.png'),
  Photo(23, 'gophercon_logo_main.png'),
  Photo(24, 'gophercon_shuttle.png'),
  Photo(25, 'gophercon_singapore_2017.png'),
  Photo(26, 'gophers.jpeg')
]
// Matches "/echo [whatever]"
bot.onText(/\/photos (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id
  const query = match[1] // the captured "whatever"

  const resultPhoto = photos.filter((photo) => {
    return photo.title.indexOf(query) !== -1
  })

  if (resultPhoto.length === 0) {
    bot.sendMessage(chatId, 'No photos found with that keyword')
    return
  }
  // send back the matched "whatever" to the chat
  bot.sendPhoto(chatId, resultPhoto[0].photo_url)
})

bot.on('inline_query', (msg) => {
  const queryId = msg.id
  const chatId = msg.from.id
  const query = msg.query.toLowerCase()

  const resultPhoto = photos.filter((photo) => {
    return photo.title.indexOf(query) !== -1
  })

  bot.answerInlineQuery(queryId, resultPhoto)
})

// bot.on('chosen_inline_result', (msg) => {
//   console.log('on:chosen_inline_result:', msg)
//   const chatId = msg.chat.id

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendPhoto(chatId, './static/gentleman.jpg')
// })
