const mongoImport = require('./mongo.js');
const { MessageMedia, Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const https = require("https");

const clientObj = {
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--ignore-certificate-errors',
            '--disable-features=IsolateOrigins,site-per-process'
        ]
    },
    ignoreMessagesFromMe: false, 
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2411.2.html',
    }
};

const client = new Client(clientObj);
  
client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});
  
client.on('ready', async () => {
    console.log('Client is ready!');
});

client.on('auth_failure', (message) => {
    console.error('Authentication failed:', message);
});

client.on('disconnected', (reason) => {
    console.log('Client disconnected:', reason);
});

async function processQuestionsData() {
    const questionsData = await mongoImport.fetchQuestions();

    const questionArray = [];
    const imageArray = [];

    questionsData.forEach(questionObj => {
        questionArray.push(questionObj.question);
        imageArray.push(questionObj.image || "");
    });

    return { questionArray, imageArray };
}

async function showQuestion() {
    const { questionArray, imageArray } = await processQuestionsData();

    if (questionArray.length === 0) {
        console.log("No questions found.");
        return;
    }

    const index = Math.floor(Math.random() * questionArray.length);
    return { questionArray, imageArray, index };
}

client.on('message_create', message => {
    if (message.body === '!syntax') {
        message.reply('\`!question\`\n');  
    }
});

client.on('message_create', async message => {
    if (message.body === '!question') {
        const { questionArray, imageArray, index } = await showQuestion();
        
        if (index >= 0 && index < questionArray.length) {
            const imageUrl = imageArray[index];

            if (imageUrl && imageUrl.startsWith("http")) {
                https.get(imageUrl, async res => {
                    if (res.statusCode === 200) {
                        const media = await MessageMedia.fromUrl(imageUrl, {unsafeMime: true});
                        await message.reply(media);
                    }
                    await message.reply(questionArray[index]);
                }).on("error", async () => {
                    await message.reply(questionArray[index]);
                });
            } else {
                await message.reply(questionArray[index]);
            }
        } else {
            message.reply("Error: Invalid question index.");
        }
    }
});

client.initialize();
