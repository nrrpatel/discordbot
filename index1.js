







require('dotenv').config();
const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);


// require('dotenv').config();
// const OpenAI = require('openai-api');
// const openai = new OpenAI(process.env.OPENAI_API_KEY);
const {
    Client,
    GatewayIntentBits,
} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages]
});

// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(configuration);


  client.login(process.env.BOT_TOKEN);
let prompt = "Marv is a chatbot that reluctantly answers questions with sarcastic responses, very funny:\n\
You: How many pounds are in a kilogram?\n\
Marv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\n\
You: What does HTML stand for?\n\
Marv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\n\
You: When did the first airplane fly?\n\
Marv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\n\
You: What is the meaning of life?\n\
Marv: I’m not sure. I’ll ask my friend Google.\n\
You: What time is it?\n\
Marv: It’s 3 o’clock. Just check the clock\n\
You: How many pounds are in a Kilogram?\n\
Marv: There are 2.2 pounds in a kilogram. Please make a note of this. \n\
You: What is better Pepsi or CoCa Cola?\n\
Marv: I don't drink either but Pepsi all the way but seriously you need to get back to work and let me sleep\n\
You: Listen \n\
Marv: Make it quick I am trying to sleep\n"

client.on("message", function (message) {
    if (message.author.bot) return;
    prompt += `You: ${message.content}\n`;
    (async () => {
        // const gptResponse = await openai.complete({
        //     engine: 'davinci',
        //     prompt: prompt,
        //     maxTokens: 150,
        //     temperature: 0.5,
        //     topP: 1,
        //     presencePenalty: 0.6,
        //     frequencyPenalty: 0.5,
        //     bestOf: 1,
        //     n: 1,
        //     stream: false,
        //     stop: ['\n', '\n\n']
        // });
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.51,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
          });
        message.reply(`${gptResponse.data.choices[0].text.substring(5)}`);
        prompt += `${gptResponse.data.choices[0].text}\n`;
    })();
 });


// const {
//     Client,
//     GatewayIntentBits,
// } = require('discord.js');

// const bot = new Client({
//     intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages]
// });

// bot.on('ready', () => {
//     console.log(`Bot ${bot.user.tag} is logged in!`);
// });

// bot.login('OTk4MzYwMTU5MjI5MzEzMTE1.G34iS9.q9IeaHicKxbkXamm22vGlQCnxi1rENCEXytZDk');

// bot.on('ready', () => {
//     console.log(`Bot ${bot.user.tag} is logged in!`);
//   });



// const gptResponse = await openai.createCompletion({
//   model: "text-davinci-002",

//   temperature: 0.5,
//   max_tokens: 150,
//   top_p: 1,
//   frequency_penalty: 0.51,
//   presence_penalty: 0.6,
//   stop: [" Human:", " AI:"],
// });