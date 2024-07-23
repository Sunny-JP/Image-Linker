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
            // 添付ファイルのURLに特定の文字列を追加
            const urlWithText = `![](${attachment.url})`;
            // URLに非表示記法を追加して送信
            await message.channel.send(urlWithText);
            // 元のメッセージを削除
            await message.delete();
        });
    }
});

// ボットのトークンを設定（自身のボットのトークンに置き換える）
client.login('YOUR_TOKEN');
