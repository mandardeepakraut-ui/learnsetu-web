export interface TelegramAlertOptions {
  botToken?: string;
  chatId?: string;
  mentorName: string;
  mentorRole: string;
  username: string;
  device?: string;
}

export async function sendTelegramAdminLoginAlert(options: TelegramAlertOptions): Promise<boolean> {
  const token = options.botToken?.trim();
  const chatId = options.chatId?.trim();

  if (!token || !chatId) {
    console.log('ℹ️ Telegram Alerts Note: Configure Bot Token & Chat ID in Admin Security Settings to receive instant mobile login alerts.');
    return false;
  }

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const deviceStr = options.device || 'Desktop Browser';

  const message = `🚨 *LearnSetu Admin Security Alert* 🚨

👤 *Admin Mentor:* ${options.mentorName} (@${options.username})
💼 *Role:* ${options.mentorRole}
📱 *Device:* ${deviceStr}
⏰ *Timestamp:* ${timestamp} (IST)

🔒 *Security Notice:* An active admin session has started. If this wasn't you, log into the admin portal immediately to revoke credentials.`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.warn('Error sending Telegram alert:', error);
    return false;
  }
}
