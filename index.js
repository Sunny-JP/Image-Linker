const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    // メッセージがボット自身からのものであれば無視する
    if (message.author.bot) return;

    // メッセージに添付ファイルが含まれているか確認
    if (message.attachments.size > 0) {
        message.attachments.forEach(async (attachment) => {
            // 添付ファイルのURLに非表示記法を追加
            const urlWithText = `![](${attachment.url})`;
            // URL送信
            await message.channel.send(urlWithText);
        });
    }
});

// ボットのトークンを設定（自身のボットのトークンに置き換える）
client.login('YOUR_TOKEN');
